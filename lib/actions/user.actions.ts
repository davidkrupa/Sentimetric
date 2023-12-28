"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    // ensure the newUser object is of correct format
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (id: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findByIdAndUpdate(id, user);

    if (!updatedUser) throw new Error("Error during updating user");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connectToDatabase();

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) throw new Error("Error during deleting user");

    revalidatePath("/");

    return JSON.parse(JSON.stringify(deletedUser));
  } catch (error) {
    handleError(error);
  }
};
