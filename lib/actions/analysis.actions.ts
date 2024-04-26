"use server";

import { SaveAnalysisParams, SingleAnalysisData } from "@/types";
import CustomAnalysis from "../database/models/analysis.model";
import Profile from "../database/models/profile.models";
import { connectToDatabase } from "../database";
import { getAiResponse } from "./openai.actions";
import { updateProfileCurrentAnalysis } from "./profile.actions";
import { getCurrentUser } from "./user.actions";
import { revalidatePath } from "next/cache";

export const createAnalysisAndSave = async (
  data: SaveAnalysisParams
): Promise<void> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profile = await Profile.findOne({ _id: user.currentProfile });

    if (!profile) throw new Error("Profile not found");

    const prompt = `
      Based on user experience and interest in the ${profile.jobTitle}, 
      prepare the brief content analysis provided at the end of this prompt. 
      The company this content is about: ${profile.company}. 
      Industry: ${profile.industry}. 
      The analysis should contain a maximum of 200 words. 
      The goal is to identify problems, challenges, and ways to improve 
      something that may have business value to that company. 
      Later, this knowledge will be used to offer a product or service 
      that meets these needs. 
      Content source: "${data.topic}". 
      Content for analysis: "${data.content}"
    `;

    const openAiResponse = await getAiResponse(prompt);

    const analysis = await CustomAnalysis.create({
      topic: data.topic,
      content: openAiResponse,
      userId: user._id,
      profileId: user.currentProfile,
    });

    if (!analysis) throw new Error("Error creating analyis");

    await updateProfileCurrentAnalysis(analysis._id);
  } catch (error) {
    console.error(error);
    throw new Error("Error creating analysis");
  }
};

export const getDoesAnalysisExist = async (): Promise<boolean> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const analysis = await CustomAnalysis.findOne({
      userId: user._id,
      profileId: user.currentProfile,
    });

    // return true if analysis exists, false otherwise
    return !!analysis;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting analysis");
  }
};

export const getAllAnalysis = async (): Promise<SingleAnalysisData[]> => {
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

    // convert formatted analysis to plain JavaScript objects
    return JSON.parse(JSON.stringify(formattedAnalysis));
  } catch (error) {
    console.error(error);
    throw new Error("Error getting all analysis");
  }
};

export const getCurrentAnalysis = async (): Promise<SingleAnalysisData> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profile = await Profile.findOne({ _id: user.currentProfile });

    if (!profile) throw new Error("Profile not found");

    const analysis = await CustomAnalysis.findOne({
      userId: user._id,
      _id: profile.currentAnalysis,
    });

    if (!analysis) {
      throw new Error("Analysis not found");
    }

    return JSON.parse(JSON.stringify(analysis));
  } catch (error) {
    console.error(error);
    throw new Error("Error getting current analysis");
  }
};

export const deleteAnalysis = async (id: string): Promise<void> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const deletedAnalysis = await CustomAnalysis.deleteOne({
      userId: user._id,
      _id: id,
    });

    // check if analysis was deleted
    if (deletedAnalysis.deletedCount === 0)
      throw new Error("Error deleting analysis. No matching document found");

    const profile = await Profile.findOne({ _id: user.currentProfile });

    if (!profile) throw new Error("Profile not found");

    // check if currently displayed analysis is the one being deleted
    if (profile.currentAnalysis?.toString() === id) {
      const firstAnalysis = await CustomAnalysis.findOne({
        userId: user._id,
        profileId: user.currentProfile,
      });
      // if more analyses exist, calls with first found _id
      // if deleted analysis was the last one, calls with null
      await updateProfileCurrentAnalysis(firstAnalysis?._id || null);
    }

    revalidatePath("/dashboard");
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting analysis");
  }
};
