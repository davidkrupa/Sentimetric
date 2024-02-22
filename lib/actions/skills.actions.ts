"use server";

import { revalidatePath } from "next/cache";

import { UserSkills } from "@/types";
import { connectToDatabase } from "../database";
import JobSkills from "../database/models/skills.model";
import { getCurrentUser } from "./user.actions";

export const addSkills = async (skills: UserSkills): Promise<void> => {
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

    if (!updatedSkills) throw new Error("Error updating skills document");

    revalidatePath("/dashboard/profile");
  } catch (error) {
    console.error(error);
    throw new Error((error as Error)?.message);
  }
};

export const getSkills = async (): Promise<UserSkills> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const jobSkills = await JobSkills.findOne<UserSkills>({
      userId: user._id,
      profileId: user.currentProfile,
    });

    const returnValue = {
      hardSkills: jobSkills?.hardSkills ?? [],
      softSkills: jobSkills?.softSkills ?? [],
    };

    return returnValue;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting skills");
  }
};

export const deleteOneSkill = async (
  skill: string,
  type: string
): Promise<void> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const skills = await JobSkills.findOneAndUpdate(
      { userId: user._id, profileId: user.currentProfile },
      { $pull: { [type]: skill } }
    );

    if (!skills) throw new Error("Error deleting one skill in skills document");

    revalidatePath("/dashboard");
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting the skill");
  }
};
