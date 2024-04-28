"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Profile from "../database/models/profile.models";
import { ProfileParams, GetDoesProfileExist, GetAllProfiles } from "@/types";
import { getCurrentUser, updateUserCurrentProfile } from "./user.actions";
import { getErrorMessage } from "../utils";

export const addProfile = async (data: ProfileParams): Promise<void> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profile = await Profile.create({
      ...data,
      userId: user._id,
    });

    if (!profile)
      throw new Error("Error creating profile. Profile creation failed.");

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { currentProfile: profile._id }
    );

    if (!updatedUser)
      throw new Error(
        "Profile creation succeeded, but updating user's currentProfile failed"
      );

    revalidatePath("/dashboard/profile");
  } catch (error) {
    console.error(error);
    throw new Error("Error creating profile");
  }
};

export const getDoesProfileExist = async (): Promise<GetDoesProfileExist> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    return {
      error: null,
      data: !!user.currentProfile,
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: false,
    };
  }
};

export const getAllProfiles = async (): Promise<GetAllProfiles> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    if (!user.currentProfile) throw new Error("No current profile found");

    const profiles = await Profile.find({ userId: user._id });

    if (profiles.length === 0) throw new Error("No profiles found");

    const profilesData = {
      currentProfileId: user.currentProfile,
      profiles: profiles,
    };

    return {
      error: null,
      data: JSON.parse(JSON.stringify(profilesData)),
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: null,
    };
  }
};

export const updateProfileCurrentAnalysis = async (
  id: string | null
): Promise<void> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: user.currentProfile, userId: user._id },
      { currentAnalysis: id }
    );

    if (!updatedProfile)
      throw new Error(
        "Error updating user's current analysis. Profile update failed"
      );

    revalidatePath("/dashboard/analysis");
  } catch (error) {
    console.error(error);
    throw new Error("Error updating current analysis");
  }
};

export const updateProfileCurrentProject = async (
  id: string
): Promise<void> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const updatedProfile = await Profile.findOneAndUpdate(
      { _id: user.currentProfile, userId: user._id },
      { currentProject: id }
    );

    if (!updatedProfile)
      throw new Error(
        "Error updating user's current project. Profile update failed"
      );

    revalidatePath("/dashboard/project");
  } catch (error) {
    console.error(error);
    throw new Error("Error updating current project");
  }
};

export const deleteProfile = async (id: string) => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const deletedProfile = await Profile.deleteOne({ _id: id });

    if (deletedProfile.deletedCount === 0)
      throw new Error("Error deleting profile. No matching profile found");

    // check if currently displayed profile is the one being deleted
    if (user.currentProfile?.toString() === id) {
      const firstProfile = await Profile.findOne({ userId: user._id });
      // if more profiles exist, calls with first found _id
      // if deleted profile was the last one, calls with null
      await updateUserCurrentProfile(firstProfile?._id || null);
    }

    revalidatePath("/dashboard");
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting profile");
  }
};
