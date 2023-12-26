// "use server";

// import { CreateUserParams } from "@/types";
// import { connectToDatabase } from "../database";
// import User from "../database/models/user.model";

// export const createUser = async (user: CreateUserParams) => {
//   try {
//     await connectToDatabase();

//     const newUser = await User.create(user);

//     return JSON.parse(JSON.stringify(newUser));
//   } catch (error) {
//     console.log(error);
//     throw new Error(typeof error === "string" ? error : JSON.stringify(error));
//   }
// };

"use server";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";

import { CreateUserParams } from "@/types";

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}
