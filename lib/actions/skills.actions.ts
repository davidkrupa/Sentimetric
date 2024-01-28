"use server";

import { UserSkills } from "@/types";
import { connectToDatabase } from "../database";
import JobSkills from "../database/models/skills.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs";
import Profile from "../database/models/profile.models";

export const addSkills = async (skills: UserSkills) => {
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

    const profile = await Profile.findOne({ userId: user._id });

    if (!profile) {
      throw new Error("Profile not found");
    }

    const jobSkills = await JobSkills.findOne({ userId: user._id });

    // Create new if no skills added yet
    if (!jobSkills) {
      const newJobSkills = await JobSkills.create({
        profileId: profile._id,
        userId: user._id,
        hardSkills: skills.hardSkills,
        softSkills: skills.softSkills,
      });

      revalidatePath("/dashboard/research");

      return JSON.parse(JSON.stringify(newJobSkills));
    }

    // Update existing document
    const updatedSkills = await JobSkills.findOneAndUpdate(
      {
        userId: user._id,
        profileId: profile._id,
      },
      {
        $push: {
          hardSkills: { $each: skills.hardSkills },
          softSkills: { $each: skills.softSkills },
        },
      },
      { new: true } // return the modified document instead of original
    );

    revalidatePath("/dashboard/research");

    return JSON.parse(JSON.stringify(updatedSkills));
  } catch (error) {
    handleError(error);
  }
};

export const getSkills = async () => {
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

    const jobSkills = await JobSkills.findOne({ userId: user._id });

    if (!jobSkills) {
      return {
        hardSkills: [],
        softSkills: [],
      };
    }

    return JSON.parse(JSON.stringify(jobSkills));
  } catch (error) {
    handleError(error);
  }
};
