"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Profile from "../database/models/profile.models";
import { ProfilesData, ProfileParams } from "@/types";
import { getCurrentUser } from "./user.actions";

export const addProfile = async (data: ProfileParams): Promise<void> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profile = await Profile.create({
      ...data,
      userId: user._id,
    });

    if (!profile) throw new Error("Error creating profile");

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { currentProfile: profile._id }
    );

    if (!updatedUser) throw new Error("Error updating currentProfile property");

    revalidatePath("/dashboard/profile");
  } catch (error) {
    console.error(error);
    throw new Error("Error creating profile");
  }
};

export const getAllProfiles = async (): Promise<ProfilesData> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profiles = await Profile.find({ userId: user._id });

    if (profiles.length === 0) throw new Error("No profiles created yet");

    const profilesData = {
      currentProfileId: user.currentProfile,
      profiles: profiles,
    };

    return JSON.parse(JSON.stringify(profilesData));
  } catch (error) {
    console.error(error);
    throw new Error("Error geting profiles");
  }
};

export const updateProfileCurrentAnalysis = async (
  id: string
): Promise<void> => {
  try {
    const user = await getCurrentUser();

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: user.currentProfile, userId: user._id },
      { currentAnalysis: id }
    );

    if (!updatedProfile) throw new Error("Error updating profile");

    revalidatePath("/dashboard/analysis");
  } catch (error) {
    console.error(error);
    throw new Error("Error updating current analysis");
  }
};
