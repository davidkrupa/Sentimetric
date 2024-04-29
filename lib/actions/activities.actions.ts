"use server";

import {
  ActionOptions,
  GetActivitiesAmountByDay,
  GetActivitiesAmountByName,
  GetLastActivities,
  NameOptions,
} from "@/types";
import { connectToDatabase } from "../database";
import Activities from "../database/models/activities.model";
import { getCurrentUser } from "./user.actions";
import { revalidatePath } from "next/cache";
import { getErrorMessage, handleError } from "../utils";

export const createActivity = async (
  name: NameOptions,
  action: ActionOptions
) => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split("T")[0]; // yyyy-mm-dd format

    const lastActivity = await Activities.findOne(
      { userId: user._id },
      {},
      { sort: { createdAt: -1 } }
    );

    // If there is no activity yet, create a new document
    if (!lastActivity) {
      const newActivity = new Activities({
        userId: user._id,
        name,
        action,
      });
      await newActivity.save();
      return;
    }

    const lastActivityDate = lastActivity.createdAt.toISOString().split("T")[0]; // yyyy-mm-dd format

    // If the last activity is the same as the current one,
    // and the last activity was today, increment the total
    if (
      lastActivity.name === name &&
      lastActivity.action === action &&
      lastActivityDate === currentDateString
    ) {
      lastActivity.total += 1;
      await lastActivity.save();
      // Otherwise create a new document
    } else {
      const newActivity = new Activities({
        userId: user._id,
        name,
        action,
      });
      await newActivity.save();
    }

    revalidatePath("/dashboard");
  } catch (error) {
    throw handleError(error);
  }
};

export const getLastActivities = async (): Promise<GetLastActivities> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const activities = await Activities.find({ userId: user._id })
      .sort({ createdAt: -1 })
      .limit(6);

    const formattedActivities = activities.map((activity) => ({
      ...activity.toObject(), // to get a plain JavaScript object without mongoose stuff
      createdAt: new Date(activity.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

    return {
      error: null,
      data: formattedActivities,
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: null,
    };
  }
};

export const getActivitiesAmountByDay = async (
  daysAmount: number
): Promise<GetActivitiesAmountByDay> => {
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

    return {
      error: null,
      data: activitiesHistory.reverse(),
    };
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: null,
    };
  }
};

export const getActivitiesAmountByName =
  async (): Promise<GetActivitiesAmountByName> => {
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

      return {
        error: null,
        data: result,
      };
    } catch (error) {
      return {
        error: getErrorMessage(error),
        data: null,
      };
    }
  };
