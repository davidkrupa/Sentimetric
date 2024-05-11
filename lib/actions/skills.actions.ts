"use server";

import { revalidatePath } from "next/cache";

import { GetDoesExist, GetSkills, UserSkills, VoidOrError } from "@/types";
import { connectToDatabase } from "../database";
import JobSkills from "../database/models/skills.model";
import { getCurrentUser } from "./user.actions";
import { getErrorMessage, handleError } from "../utils";

export const addSkills = async (skills: UserSkills): Promise<VoidOrError> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    if (!user.currentProfile)
      throw new Error("You need to create profile first");

    const updatedSkills = await JobSkills.findOneAndUpdate(
      {
        userId: user._id,
        profileId: user.currentProfile,
      },
      {
        $addToSet: {
          hardSkills: { $each: skills.hardSkills },
          softSkills: { $each: skills.softSkills },
        },
      },
      {
        new: true, // return the modified document instead of original
        upsert: true, // create a new document if no match is found
      }
    );

    if (!updatedSkills) throw new Error("Error adding skill to the list");

    revalidatePath("/dashboard/profile");
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const getGetDoSkillsExist = async (): Promise<GetDoesExist> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    if (!user.currentProfile)
      throw new Error("Profile not found. Please create a profile first.");

    const skills = await JobSkills.findOne({
      userId: user._id,
      profileId: user.currentProfile,
    });

    const returnValue =
      skills?.hardSkills.length > 0 || skills?.softSkills.length > 0;

    return {
      error: null,
      data: returnValue,
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: false,
    };
  }
};

export const getSkills = async (): Promise<GetSkills> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    if (!user.currentProfile)
      throw new Error("You need to create profile first");

    const jobSkills = await JobSkills.findOne({
      userId: user._id,
      profileId: user.currentProfile,
    });

    let returnValue = null;

    if (
      jobSkills?.hardSkills?.length > 0 ||
      jobSkills?.softSkills?.length > 0
    ) {
      returnValue = {
        hardSkills: jobSkills.hardSkills,
        softSkills: jobSkills.softSkills,
      };
    }

    return {
      error: null,
      data: returnValue,
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: null,
    };
  }
};

export const deleteOneSkill = async (
  skill: string,
  type: string
): Promise<void> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    if (!user.currentProfile)
      throw new Error("You need to create profile first");

    const skills = await JobSkills.findOneAndUpdate(
      { userId: user._id, profileId: user.currentProfile },
      { $pull: { [type]: skill } }
    );

    if (!skills) throw new Error("Error deleting the skill");

    revalidatePath("/dashboard");
  } catch (error) {
    throw handleError(error);
  }
};
