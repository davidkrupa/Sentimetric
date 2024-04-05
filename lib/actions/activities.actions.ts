"use server";

import { connectToDatabase } from "../database";
import Activities from "../database/models/activities.model";
import { getCurrentUser } from "./user.actions";

export const createActivity = async (name: string, action: string) => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const lastActivity = await Activities.findOne(
      { userId: user._id },
      {},
      { sort: { createdAt: -1 } }
    );

    // If the last activity is the same as the current one, increment the total
    if (
      lastActivity &&
      lastActivity.name === name &&
      lastActivity.action === action
    ) {
      lastActivity.total += 1;
      await lastActivity.save();
      // If the last activity is different, create a new document
    } else {
      const newActivity = new Activities({
        userId: user._id,
        name,
        action,
      });
      await newActivity.save();
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error creating activity");
  }
};

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

export const getActivitiesCount = async (daysAmount: number) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - daysAmount);

  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const result = await Activities.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          userId: user._id,
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: 1,
        },
      },
    ]);

    if (result.length === 0)
      throw new Error("No activities found in the last 7 days");

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("No activities found in the last 7 days");
  }
};
