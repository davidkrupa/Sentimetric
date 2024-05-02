"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import CustomAnalysis from "../database/models/analysis.model";
import Ideas from "../database/models/ideas.model";
import Profile from "../database/models/profile.models";
import { getAiResponse } from "./openai.actions";
import { getCurrentUser } from "./user.actions";
import JobSkills from "../database/models/skills.model";
import { GetIdeas, VoidOrError } from "@/types";
import { getErrorMessage } from "../utils";

export const createIdeasFromProfile = async (): Promise<VoidOrError> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const allAnalysis = await CustomAnalysis.find({
      userId: user._id,
      profileId: user.currentProfile,
    });

    if (allAnalysis.length === 0)
      throw new Error("No analysis found for the current profile.");

    // prepare analysis prompt
    let analysisPrompt = "";
    for (let i = 0; i < allAnalysis.length; i++) {
      analysisPrompt += `
      Topic of the analysis: "${allAnalysis[i].topic}",
      Content of the analysis: "${allAnalysis[i].content}"
      `;
    }

    const profile = await Profile.findOne({ _id: user.currentProfile });

    if (!profile) throw new Error("The current user profile was not found.");

    const skills = await JobSkills.findOne({ profileId: user.currentProfile });

    if (!skills)
      throw new Error("No skills found for the current user profile.");

    const prompt = `
      Below is the user profile containing analyses of the selected company. 
      Please analyze the provided data and, based on it, present a list of 
      3-6 project ideas that the user can undertake to provide real business value 
      to the selected company. Ideas should be within the user's experience and skills. 
      The project may go slightly beyond the skills the user currently has.

      Your answer should consist of two parts: 
      - A short conclusion from the analysis list containing the most important 
      information and suggestions, especially if they may have business value for the company.
      - A numbered list of project ideas that may have real value for the company 
      and that can be undertaken by the user, based on their profile (experience and skills).

      User profile:
      - User area of experience: "${profile.jobTitle}";
      - Analyzed company: "${profile.company}";
      - Industry: "${profile.industry}";
      - User hard skills: "${skills.hardSkills || "N/A"}";
      - User soft skills: "${skills.softSkills || "N/A"}";
      - List of brief analyses of the company: ${analysisPrompt}
    `;

    const aiResponse = await getAiResponse(prompt);

    await Ideas.create({
      content: aiResponse,
      userId: user._id,
      profileId: user.currentProfile,
    });

    revalidatePath("/dashboard/ideas");
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const getIdeas = async (): Promise<GetIdeas> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profile = await Profile.findOne({ _id: user.currentProfile });

    if (!profile) throw new Error("You need to create profile first.");

    const ideas = await Ideas.findOne({
      userId: user._id,
      profileId: profile._id,
    });

    return {
      error: null,
      data: JSON.parse(JSON.stringify(ideas)),
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: null,
    };
  }
};
