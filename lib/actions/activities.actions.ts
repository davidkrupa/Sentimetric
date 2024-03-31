"use server";

import { connectToDatabase } from "../database";
import Activities from "../database/models/activities.model";
import { getCurrentUser } from "./user.actions";

export const getActivities = async () => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const activities = await Activities.findOne({ userId: user._id });

    if (!activities) return;

    return JSON.parse(JSON.stringify(activities));
  } catch (error) {
    console.error(error);
    throw new Error("Error creating activity");
  }
};
