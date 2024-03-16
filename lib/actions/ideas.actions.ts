"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import CustomAnalysis from "../database/models/analysis.model";
import Ideas from "../database/models/ideas.model";
import Profile from "../database/models/profile.models";
import { getAiResponse } from "./openai.actions";
import { getCurrentUser } from "./user.actions";
import JobSkills from "../database/models/skills.model";
import { IdeasData } from "@/types";

export const createIdeasFromProfile = async (): Promise<void> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const allAnalysis = await CustomAnalysis.find({ userId: user._id });

    if (allAnalysis.length === 0) throw new Error("No analysis yet");

    let analysisPrompt = "";

    for (let i = 0; i < allAnalysis.length; i++) {
      analysisPrompt += `
      Topic of the analysis: "${allAnalysis[i].topic}",
      Content of the analysis: "${allAnalysis[i].content}"
      `;
    }

    const profile = await Profile.findOne({ _id: user.currentProfile });

    const skills = await JobSkills.findOne({ profileId: user.currentProfile });

    if (allAnalysis.length === 0) throw new Error("No analysis yet.");
    if (!profile) throw new Error("No profile yet.");

    const prompt = `Below is the user profile containing analyzes of the company selected by the user. Please analyze the provided data and, based on it, present a list of 3-6 project ideas that the user can make to provide the selected company with real business value. Ideas should be within the user's experience and skills. The project may go slightly beyond the skills the user currently has.

    Your answer should consist of two parts: first - a short conclusion from the analysis list containing the most important information and suggestions, especially if they may have business value for the company; second - a numbered list of project ideas that may have real value for the company and that can be made by the user, based on user profile (experience and skills).

    User profile:
    user area of experience: "${profile.jobTitle}";
    analyzed company: "${profile.company}";
    industry: "${profile.industry}";
    user hard skills: "${skills?.hardSkills}";
    user soft skills: "${skills?.softSkills}";
    list of brief analysis of the company: ${analysisPrompt}`;

    const aiResponse = await getAiResponse(prompt);

    const ideas = await Ideas.create({
      content: aiResponse,
      userId: user._id,
      profileId: user.currentProfile,
    });

    revalidatePath("/dashboard/ideas");
  } catch (error) {}
};

export const getIdeas = async (): Promise<IdeasData | undefined> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profile = await Profile.findOne({ _id: user.currentProfile });

    if (!profile) throw new Error("You need to create profile first.");

    const ideas = await Ideas.findOne({
      userId: user._id,
      profileId: profile._id,
    });

    if (!ideas) return;

    return JSON.parse(JSON.stringify(ideas));
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
