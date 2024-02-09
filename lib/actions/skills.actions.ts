"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { UserParams, UserSkills } from "@/types";
import { connectToDatabase } from "../database";
import JobSkills from "../database/models/skills.model";
import User from "../database/models/user.model";

const getUser = async (): Promise<UserParams> => {
  await connectToDatabase();

  const { userId }: { userId: string | null } = auth();

  if (!userId) throw new Error("User not authorized");

  const user = await User.findOne({ clerkId: userId });

  if (!user) throw new Error(`User not found with Clerk Id: ${userId}`);

  return user;
};
export const addSkills = async (skills: UserSkills): Promise<void> => {
  try {
    const user = await getUser();

    await JobSkills.findOneAndUpdate(
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

    revalidatePath("/dashboard/profile");
  } catch (error) {
    console.error(error);
    throw new Error("Error adding skills");
  }
};

export const getSkills = async (): Promise<UserSkills> => {
  try {
    const user = await getUser();

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
    const user = await getUser();

    const updatdSkills = await JobSkills.updateOne(
      { userId: user._id, profileId: user.currentProfile },
      { $pull: { [type]: skill } }
    );

    revalidatePath("/dashboard");
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting the skill");
  }
};
