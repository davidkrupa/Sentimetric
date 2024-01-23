"use server";

import { auth } from "@clerk/nextjs";

import { CustomAnalysisParams } from "@/types";
import CustomAnalysis from "../database/models/analysis.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database";
import { getAiResponse } from "./openai.actions";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

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
    });

    if (!analysis) {
      throw new Error("Error during creating analyis");
    }

    revalidatePath("/dashboard/analysis");
  } catch (error) {
    handleError(error);
  }
};

export async function getAllAnalysis(): Promise<CustomAnalysisParams[]> {
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

    const allAnalysis = await CustomAnalysis.find({ userId: user._id });

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
}