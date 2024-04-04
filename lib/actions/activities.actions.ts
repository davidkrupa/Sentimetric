"use server";

import { connectToDatabase } from "../database";
import Activities from "../database/models/activities.model";
import { getCurrentUser } from "./user.actions";

export const getActivities = async () => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const activities = await Activities.find({ userId: user._id });

    if (activities.length === 0) return;

    return JSON.parse(JSON.stringify(activities));
  } catch (error) {
    console.error(error);
    throw new Error("Error creating activity");
  }
};

export const createActivity = async (name: string, action: string) => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const newActivity = await Activities.create({
      userId: user._id,
      name,
      action,
    });

    if (!newActivity) throw new Error("Error creating activity");
  } catch (error) {
    console.error(error);
    throw new Error("Error creating activity");
  }
};
