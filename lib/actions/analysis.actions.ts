"use server";

import {
  GetAllAnalysis,
  GetCurrentAnalysis,
  GetDoesAnalysisExist,
  SaveAnalysisParams,
  VoidOrError,
} from "@/types";
import CustomAnalysis from "../database/models/analysis.model";
import Profile from "../database/models/profile.models";
import { connectToDatabase } from "../database";
import { getAiResponse } from "./openai.actions";
import { updateProfileCurrentAnalysis } from "./profile.actions";
import { getCurrentUser } from "./user.actions";
import { revalidatePath } from "next/cache";
import { getErrorMessage } from "../utils";
import JobSkills from "../database/models/skills.model";

export const createAnalysisAndSave = async (
  data: SaveAnalysisParams
): Promise<VoidOrError> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profile = await Profile.findOne({ _id: user.currentProfile });

    if (!profile) throw new Error("You need to create profile first");

    const skills = await JobSkills.findOne({
      userId: user._id,
      profileId: user.currentProfile,
    });

    if (!skills) throw new Error("Skills not found.");
    if (skills.hardSkills.length === 0 && skills.softSkills.length === 0) {
      throw new Error("You need to add skills first");
    }

    const skillsString = [...skills.hardSkills, ...skills.softSkills].join(
      ", "
    );

    const prompt = process.env
      .ANALYSIS_PROMPT!.replace("{{jobTitle}}", profile.jobTitle)
      .replace("{{skills}}", skillsString)
      .replace("{{company}}", profile.company)
      .replace("{{industry}}", profile.industry)
      .replace("{{topic}}", data.topic)
      .replace("{{content}}", data.content);

    const openAiResponse = await getAiResponse(prompt);

    const analysis = await CustomAnalysis.create({
      topic: data.topic,
      content: openAiResponse,
      userId: user._id,
      profileId: user.currentProfile,
    });

    if (!analysis) throw new Error("Error creating analyis");

    // updateProfileCurrentAnalysis may return an error message instead
    // of throwing an error because it is also used in the UI
    const analysisUpdate = await updateProfileCurrentAnalysis(analysis._id);
    if (analysisUpdate?.error) {
      throw new Error(analysisUpdate.error);
    }
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const getDoesAnalysisExist = async (): Promise<GetDoesAnalysisExist> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const analysis = await CustomAnalysis.findOne({
      userId: user._id,
      profileId: user.currentProfile,
    });

    return {
      error: null,
      data: !!analysis, // return true if analysis exists, false otherwise
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: false,
    };
  }
};

export const getAllAnalysis = async (): Promise<GetAllAnalysis> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const allAnalysis = await CustomAnalysis.find({
      userId: user._id,
      profileId: user.currentProfile,
    });

    // format the analysis data
    const formattedAnalysis = allAnalysis.map((analysis) => ({
      ...analysis.toObject(), // to get a plain JavaScript object without mongoose stuff
      createdAt: new Date(analysis.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

    return {
      error: null,
      // convert formatted analysis to plain JavaScript objects
      data: JSON.parse(JSON.stringify(formattedAnalysis)),
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: [],
    };
  }
};

export const getCurrentAnalysis = async (): Promise<GetCurrentAnalysis> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profile = await Profile.findOne({ _id: user.currentProfile });

    if (!profile) throw new Error("You need to create profile first");

    const analysis = await CustomAnalysis.findOne({
      userId: user._id,
      _id: profile.currentAnalysis,
    });

    if (!analysis) {
      throw new Error("Analysis not found");
    }

    return {
      error: null,
      data: JSON.parse(JSON.stringify(analysis)),
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: null,
    };
  }
};

export const deleteAnalysis = async (id: string): Promise<VoidOrError> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const deletedAnalysis = await CustomAnalysis.deleteOne({
      userId: user._id,
      _id: id,
    });

    // check if analysis was deleted
    if (deletedAnalysis.deletedCount === 0)
      throw new Error("Error deleting analysis. No matching document found.");

    const profile = await Profile.findOne({ _id: user.currentProfile });

    if (!profile)
      throw new Error(
        "Error updating user's current analysis. Profile update failed."
      );

    // check if currently displayed analysis is the one being deleted
    if (profile.currentAnalysis?.toString() === id) {
      const firstAnalysis = await CustomAnalysis.findOne({
        userId: user._id,
        profileId: user.currentProfile,
      });
      // if more analyses exist, calls with first found _id
      // if deleted analysis was the last one, calls with null
      const analysisUpdate = await updateProfileCurrentAnalysis(
        firstAnalysis?._id || null
      );
      // updateProfileCurrentAnalysis may return an error message instead
      // of throwing an error because it is also used in the UI
      if (analysisUpdate?.error) {
        throw new Error(analysisUpdate.error);
      }
    }

    revalidatePath("/dashboard");
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};
