"use server";

import { CreateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";

export const createUser = async (user: CreateUserParams) => {
  console.log("ACTION: start");
  try {
    await connectToDatabase();

    console.log("ACTION: after connection");

    const newUser = await User.create(user);

    console.log(`ACTION: user created - ${JSON.stringify(newUser)}`);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
};
