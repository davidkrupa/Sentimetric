"use server";

import { UserSkills } from "@/types";
import { connectToDatabase } from "../database";
import JobSkills from "../database/models/skills.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs";

export const addSkills = async (skills: UserSkills) => {
  try {
    await connectToDatabase();

    const { userId }: { userId: string | null } = auth();

    console.log(`USERID1: ${userId}`);

    if (!userId) {
      throw new Error("User not authorized");
    }

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error(`User not found with Clerk Id: ${userId}`);
    }

    const jobSkills = await JobSkills.findOne({ userId: user._id });

    // Create new if no skills added yet
    if (!jobSkills) {
      const newJobSkills = await JobSkills.create({
        userId: user._id, // id of related User document
        hardSkills: skills.hardSkills,
        softSkills: skills.softSkills,
      });

      revalidatePath("/dashboard/research");

      return JSON.parse(JSON.stringify(newJobSkills));
    }

    // Update existing document
    const updatedSkills = await JobSkills.findOneAndUpdate(
      { userId: user._id },
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
