"use server";

import { VoidOrError } from "@/types";
import { connectToDatabase } from "../database";
import { getCurrentUser } from "./user.actions";
import Review from "../database/models/review.model";
import { getErrorMessage } from "../utils";

export const createReview = async (content: string): Promise<VoidOrError> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    await Review.create({
      content,
      userId: user._id,
    });
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};
