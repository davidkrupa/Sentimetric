"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import Project from "../database/models/project.model";
import { getCurrentUser } from "./user.actions";
import { ProjectsData } from "@/types";
import { getAiResponse } from "./openai.actions";
import JobSkills from "../database/models/skills.model";
import Profile from "../database/models/profile.models";
import Ideas from "../database/models/ideas.model";

export const createProjectsTopicsFromContent = async (): Promise<void> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const ideas = await Ideas.findOne({
      userId: user._id,
      profileId: user.currentProfile,
    });

    if (!ideas) throw new Error("No ideas found for the current profile");

    // regular expression to extract project topics
    const regex = /\b\d+\.\s+([^.!?\n]+\.)\s*/g;

    const projects = [];
    let match;
    // extract project topics from the ideas content
    while ((match = regex.exec(ideas.content)) !== null) {
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

export const updateCurrentProject = async (
  projectId: string
): Promise<void> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profile = await Profile.findOneAndUpdate(
      { _id: user.currentProfile, userId: user._id },
      { currentProject: projectId }
    );

    if (!profile)
      throw new Error("Error updating current project. Profile update failed");

    revalidatePath("/dashboard/project");
  } catch (error) {
    console.error(error);
    throw new Error("Error updating current project");
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

    if (!project)
      throw new Error("Error deleting one project. Project not found");

    revalidatePath("/dashboard");
  } catch (error) {
    throw new Error("Error deleting one project");
  }
};

export const createProject = async () => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profile = await Profile.findOne({
      userId: user._id,
      _id: user.currentProfile,
    });

    if (!profile) throw new Error("No profile found for the current user");

    const skills = await JobSkills.findOne({
      userId: user._id,
      profileId: user.currentProfile,
    });

    if (!skills) throw new Error("No skills found for the current profile");

    const prompt = `Based on your skills (${skills?.hardSkills}) 
      and profile (${profile?.jobTitle}, ${profile?.company}, 
      ${profile?.industry}), generate a project idea that aligns 
      with your expertise and interests.
    `;

    const response = await getAiResponse(prompt);

    const project = await Project.findOneAndUpdate(
      { userId: user._id, profileId: user.currentProfile },
      { content: response },
      { upsert: true, new: true }
    );

    if (!project) throw new Error("Error creating project");

    revalidatePath("/dashboard/project");
  } catch (error) {
    throw new Error("Error creating project");
  }
};
