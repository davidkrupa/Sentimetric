"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Project from "../database/models/project.model";
import { getCurrentUser } from "./user.actions";

const createDefaultProjectsTopics = async (content: string): Promise<void> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const regex = /\b\d+\.\s+(.*)/g;

    const projects = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      projects.push({
        name: match[1],
        topic: match[1],
        content: "",
        userId: user._id,
        profileId: user.currentProfile,
      });
    }

    const projectTitles = await Project.insertMany(projects);

    revalidatePath("/dashboard/ideas");
  } catch (error) {}
};
