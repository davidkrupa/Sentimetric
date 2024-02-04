"use server";

import { auth } from "@clerk/nextjs";

import { CustomAnalysisParams } from "@/types";
import CustomAnalysis from "../database/models/analysis.model";
import User from "../database/models/user.model";
import Profile from "../database/models/profile.models";
import { connectToDatabase } from "../database";
import { getAiResponse } from "./openai.actions";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import { updateProfileCurrentAnalysis } from "./profile.actions";

export const getAnalysisAndSave = async (data: CustomAnalysisParams) => {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("User not authorized");
    }

    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error(`User not found with Clerk Id: ${userId}`);
    }

    // later combine other user data to get better response
    const prompt = `Prepare analysis of provided content which is company about page and make list of 3-6 project ideas for a frontend developer that will show skills that company looks for. Content: ${data.content}`;

    const openAiResponse = await getAiResponse(prompt);

    const analysis = await CustomAnalysis.create({
      topic: data.topic,
      content: openAiResponse,
      userId: user._id,
      profileId: user.currentProfile,
    });

    if (!analysis) {
      throw new Error("Error during creating analyis");
    }

    await updateProfileCurrentAnalysis(analysis._id);

    revalidatePath("/dashboard/analysis");
  } catch (error) {
    handleError(error);
  }
};

export const getAllAnalysis = async (): Promise<CustomAnalysisParams[]> => {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("User not authorized");
    }

    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error(`User not found with Clerk Id: ${userId}`);
    }

    const allAnalysis = await CustomAnalysis.find({
      userId: user._id,
      profileId: user.currentProfile,
    });

    if (!allAnalysis) {
      throw new Error("Analysis for user not found");
    }

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
    handleError(error);
  }

  // for typescript
  return [];
};

export const getCurrentAnalysis = async () => {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("User not authorized");
    }

    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error(`User not found with Clerk Id: ${userId}`);
    }

    const profile = await Profile.findOne({ _id: user.currentProfile });

    if (!profile) {
      throw new Error("Profile not found");
    }

    const analysis = await CustomAnalysis.findOne({
      userId: user._id,
      _id: profile.currentAnalysis,
    });

    return JSON.parse(JSON.stringify(analysis));
  } catch (error) {
    handleError(error);
  }
};
