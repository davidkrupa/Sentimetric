"use server";

import { auth } from "@clerk/nextjs";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Profile from "../database/models/profile.models";
import { ProfileParams } from "@/types";

export const addProfile = async (data: ProfileParams) => {
  try {
    await connectToDatabase();

    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("User not authorized");
    }

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error(`User not found with Clerk Id: ${userId}`);
    }

    const profile = await Profile.create({
      ...data,
      userId: user._id,
    });
  } catch (error) {}
};
