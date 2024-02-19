"use server";

import { SaveAnalysisParams, SingleAnalysisData } from "@/types";
import CustomAnalysis from "../database/models/analysis.model";
import Profile from "../database/models/profile.models";
import { connectToDatabase } from "../database";
import { getAiResponse } from "./openai.actions";
import { updateProfileCurrentAnalysis } from "./profile.actions";
import { getCurrentUser } from "./user.actions";

export const getAnalysisAndSave = async (
  data: SaveAnalysisParams
): Promise<void> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profile = await Profile.findOne({ _id: user.currentProfile });

    const prompt = `Based on user experience and interest in the ${profile.jobTitle}, prepare the brief content analysis provided at the end of this prompt. The company this content is about: ${profile.company}. Industry: ${profile.industry}. The analysis should contain a maximum of 200 words. The goal is to identify problems, challenges, and ways to improve something that may have business value to that company. Later, this knowledge will be used to offer a product or service that meets these needs. Content source: "${data.topic}". Content for analysis: "${data.content}"`;

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
