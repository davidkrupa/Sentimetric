"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { CreateUserParams, UpdateUserParams, UserParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { handleError } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    if (!newUser) throw new Error("Error creating user");

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user);

    if (!updatedUser) throw new Error("Error updating user");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

export const updateUserCurrentProfile = async (id: string): Promise<void> => {
  try {
    await connectToDatabase();

    const { userId }: { userId: string | null } = auth();

    if (!userId) throw new Error("User not authorized");

    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userId },
      { currentProfile: id }
    );

    if (!updatedUser) throw new Error("User not updated");

    revalidatePath("/dashboard");
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase();

    const deletedUser = await User.findOneAndDelete({ clerkId });

    if (!deletedUser) throw new Error("Error deleting user");

    revalidatePath("/");

    return JSON.parse(JSON.stringify(deletedUser));
  } catch (error) {
    handleError(error);
  }
};

export const getCurrentUser = async (): Promise<UserParams> => {
  const { userId }: { userId: string | null } = auth();

  if (!userId) throw new Error("User not authorized");

  const user = await User.findOne({ clerkId: userId });

  if (!user) throw new Error(`User not found with Clerk Id: ${userId}`);

  return user;
};
