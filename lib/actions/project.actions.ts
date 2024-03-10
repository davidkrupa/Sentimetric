"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Project from "../database/models/project.model";
import { getCurrentUser } from "./user.actions";
import { ProjectsData } from "@/types";

export const createProjectsTopicsFromContent = async (
  content: string
): Promise<void> => {
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
        userId: user._id,
        profileId: user.currentProfile,
      });
    }

    if (projects.length === 0) return;

    await Project.insertMany(projects);

    revalidatePath("/dashboard/ideas");
  } catch (error) {
    console.error(error);
  }
};

export const getProjects = async (): Promise<ProjectsData[] | undefined> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const projects = await Project.find({
      userId: user._id,
      profileId: user.currentProfile,
    });

    if (projects.length === 0) return;

    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error(error);
  }
};

export const deleteOneProject = async (id: string): Promise<void> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const project = await Project.findOneAndDelete({
      userId: user._id,
      profileId: user.currentProfile,
      _id: id,
    });

    if (!project) throw new Error("Error deleting one project");

    revalidatePath("/dashboard");
  } catch (error) {
    throw new Error("Error deleting one project");
  }
};
