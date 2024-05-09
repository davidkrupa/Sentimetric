"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "../database";
import CustomAnalysis from "../database/models/analysis.model";
import Ideas from "../database/models/ideas.model";
import Profile from "../database/models/profile.models";
import JobSkills from "../database/models/skills.model";
import { getAiResponse } from "./openai.actions";
import { getCurrentUser } from "./user.actions";
import {
  FormatTextResults,
  FormatedIdea,
  GetCurrentIdeas,
  GetIdeas,
  PickedFormattedIds,
  VoidOrError,
} from "@/types";
import { formatText, getErrorMessage } from "../utils";

export const getPromptVariables = async () => {
  await connectToDatabase();

  const user = await getCurrentUser();

  const allAnalysis = await CustomAnalysis.find({
    userId: user._id,
    profileId: user.currentProfile,
  });

  if (allAnalysis.length === 0)
    throw new Error("No analysis found for the current profile.");

  // prepare all analysis content
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

  if (!skills) throw new Error("No skills found for the current user profile.");
  if (skills.hardSkills.length === 0 && skills.softSkills.length === 0) {
    throw new Error("You need to add skills first");
  }

  const skillsString = [...skills.hardSkills, ...skills.softSkills].join(", ");

  return {
    jobTitle: profile.jobTitle,
    skills: skillsString,
    company: profile.company,
    industry: profile.industry,
    content: analysisPrompt,
  };
};

export const creteIdeasForCompany = async (): Promise<VoidOrError> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const { jobTitle, skills, company, industry, content } =
      await getPromptVariables();

    const prompt = process.env
      .COMPANY_ANALYSIS_IDEAS_ONLY_PROMPT!.replace("{{jobTitle}}", jobTitle)
      .replace("{{skills}}", skills)
      .replace("{{company}}", company)
      .replace("{{industry}}", industry)
      .replace("{{content}}", content);

    const aiResponse = await getAiResponse(prompt);

    const formatted = formatText(aiResponse);

    await Ideas.create({
      content: aiResponse,
      formatted,
      pickedFormattedIds: [{ index: 0 }, { index: 1 }, { index: 2 }],
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

export const getCurrentIdeas = async (): Promise<GetCurrentIdeas> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profile = await Profile.findOne({ _id: user.currentProfile });

    if (!profile) throw new Error("You need to create profile first.");

    const ideas = await Ideas.findOne({
      userId: user._id,
      profileId: profile._id,
    });

    if (!ideas) throw new Error("You need to create ideas first.");

    // return current ideas for each card, or when not yet picked, idea at index
    const currentIdeas = ideas.pickedFormattedIds.map(
      (picked: PickedFormattedIds, index: number) => {
        return (
          ideas.formatted.find(
            (idea: FormatedIdea) =>
              // returns undefined when pickedFormattedIds.formatted === null
              idea._id.toString() === picked.formatted?.toString()
          ) ?? ideas.formatted[index]
        );
      }
    );

    return {
      error: null,
      data: JSON.parse(JSON.stringify(currentIdeas)),
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: null,
    };
  }
};

export const updatePickedIdeas = async (
  id: string,
  index: number
): Promise<VoidOrError> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profile = await Profile.findOne({ _id: user.currentProfile });

    if (!profile) throw new Error("You need to create profile first.");

    const ideas = await Ideas.findOneAndUpdate(
      {
        userId: user._id,
        profileId: profile._id,
        "pickedFormattedIds.index": index,
      },
      { $set: { "pickedFormattedIds.$.formatted": id } }
    );

    revalidatePath("/dashboard/project");
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};
