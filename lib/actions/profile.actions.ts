"use server";

import { auth } from "@clerk/nextjs";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Profile from "../database/models/profile.models";
import { ProfileData, ProfileParams } from "@/types";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

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

    const editedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      { currentProfile: profile._id }
    );
  } catch (error) {
    handleError(error);
  }
};

export const getAllProfiles = async (): Promise<ProfileData[]> => {
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

    const profiles = await Profile.find({ userId: user._id });

    if (!profiles) {
      return [
        {
          jobTitle: "",
          company: "",
          industry: "",
          _id: "",
          userId: "",
          createdAt: "",
        },
      ];
    }

    return JSON.parse(JSON.stringify(profiles));
  } catch (error) {
    handleError(error);
    return [];
  }
};

export const updateCurrentProfile = async (id: string) => {
  try {
    await connectToDatabase();

    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("User not authorized");
    }

    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      { currentProfile: id }
    );

    if (!updatedUser) {
      throw new Error(`User not found with Clerk Id: ${userId}`);
    }

    revalidatePath("/dashboard");
  } catch (error) {
    handleError(error);
  }
};

export const updateProfileCurrentAnalysis = async (id: string) => {
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

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: user.currentProfile, userId: user._id },
      { currentAnalysis: id }
    );

    console.log("UPDATED PROFILE: ", updatedProfile);

    if (!updatedProfile) {
      throw new Error(`Profile not found with Clerk Id: ${userId}`);
    }

    revalidatePath("/dashboard/analysis");
  } catch (error) {
    handleError(error);
  }
};

export const getCurrentProfileId = async () => {
  try {
    await connectToDatabase();

    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("User not authorized");
    }

    if (!userId) {
      throw new Error("User not authorized");
    }

    const user = await User.findOne({ clerkId: userId });

    return JSON.parse(JSON.stringify(user.currentProfile));
  } catch (error) {
    handleError(error);
  }
};
