"use server";

import { ActionOptions, ActivitiesAmountByDay, NameOptions } from "@/types";
import { connectToDatabase } from "../database";
import Activities from "../database/models/activities.model";
import { getCurrentUser } from "./user.actions";

export const createActivity = async (
  name: NameOptions,
  action: ActionOptions
) => {
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

export const getLastActivities = async () => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const activities = await Activities.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    const formattedActivities = activities.map((activity) => ({
      ...activity.toObject(), // to get a plain JavaScript object without mongoose stuff
      createdAt: new Date(activity.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

    return formattedActivities;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting activities");
  }
};

export const getActivitiesAmountByDay = async (
  daysAmount: number
): Promise<ActivitiesAmountByDay[]> => {
  const dayShort = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const result = await Activities.aggregate([
      {
        $match: {
          userId: user._id,
          createdAt: {
            $gte: new Date(
              new Date().setDate(new Date().getDate() - daysAmount)
            ),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: "$total" },
        },
      },
    ]);

    const currentDate = new Date();

    const activitiesHistory = Array.from({ length: daysAmount }, (_, index) => {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - index);
      const formattedDate = date.toISOString().split("T")[0]; // Format the date as "YYYY-MM-DD"
      const dayName = dayShort[date.getDay()]; // Get the day name abbreviation
      const activity = result.find((item) => item._id === formattedDate);
      const total = activity ? activity.total : 0; // For days with no activities, fill 0
      return { day: dayName, activities: total };
    });

    return activitiesHistory.reverse();
  } catch (error) {
    console.error(error);
    throw new Error("Error getting activities amounts");
  }
};

export const getActivitiesAmountByName = async () => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const result = await Activities.aggregate([
      {
        $match: {
          userId: user._id,
        },
      },
      {
        $group: {
          _id: { name: "$name", action: "$action" },
          total: { $sum: "$total" },
        },
      },
    ]);

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting activities amounts");
  }
};
