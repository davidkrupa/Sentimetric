"use server";

import { revalidatePath } from "next/cache";

import { getPromptVariables } from "./ideas.actions";
import { getAiResponse } from "./openai.actions";
import { getCurrentUser } from "./user.actions";
import { getErrorMessage } from "../utils";
import { GetCompanySummary, GetDoesExist, VoidOrError } from "@/types";
import { connectToDatabase } from "../database";
import CompanySummary from "../database/models/summary.model";
import Profile from "../database/models/profile.models";

export const createCompanySummary = async (): Promise<VoidOrError> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const { jobTitle, skills, company, industry, content } =
      await getPromptVariables();

    const prompt = process.env
      .COMPANY_ANALYSIS_PROMPT!.replace("{{jobTitle}}", jobTitle)
      .replace("{{skills}}", skills)
      .replace("{{company}}", company)
      .replace("{{industry}}", industry)
      .replace("{{content}}", content);

    const aiResponse = await getAiResponse(prompt);

    await CompanySummary.create({
      content: aiResponse,
      userId: user._id,
      profileId: user.currentProfile,
    });

    revalidatePath("/dashboard/ideas");
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const getCompanySummary = async (): Promise<GetCompanySummary> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profile = await Profile.findOne({ _id: user.currentProfile });

    if (!profile) throw new Error("You need to create profile first.");

    const summary = await CompanySummary.findOne({
      userId: user._id,
      profileId: profile._id,
    });

    return {
      error: null,
      data: JSON.parse(JSON.stringify(summary)),
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: null,
    };
  }
};

export const getDoesSummaryExist = async (): Promise<GetDoesExist> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const ideas = await CompanySummary.findOne({
      userId: user._id,
      profileId: user.currentProfile,
    });

    return {
      error: null,
      data: !!ideas, // return true if ideas exists, false otherwise
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: false,
    };
  }
};
