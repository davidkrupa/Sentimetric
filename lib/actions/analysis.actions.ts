"use server";

import { SaveAnalysisParams, SingleAnalysisData } from "@/types";
import CustomAnalysis from "../database/models/analysis.model";
import Profile from "../database/models/profile.models";
import { connectToDatabase } from "../database";
import { getAiResponse } from "./openai.actions";
import { handleError } from "../utils";
import { updateProfileCurrentAnalysis } from "./profile.actions";
import { getCurrentUser } from "./user.actions";

export const getAnalysisAndSave = async (
  data: SaveAnalysisParams
): Promise<void> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    // later combine other user data to get better response
    const prompt = `Prepare analysis of provided content which is company about page and make list of 3-6 project ideas for a frontend developer that will show skills that company looks for. Content: ${data.content}`;

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

export const getAllAnalysis = async (): Promise<SingleAnalysisData[]> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const allAnalysis = await CustomAnalysis.find({
      userId: user._id,
      profileId: user.currentProfile,
    });

    const formattedAnalysis = allAnalysis.map((analysis) => ({
      ...analysis.toObject(), // to get a plain JavaScript object without mongoose stuff
      createdAt: new Date(analysis.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

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

    return JSON.parse(JSON.stringify(analysis));
  } catch (error) {
    console.error(error);
    throw new Error("Error getting current analysis");
  }
};
