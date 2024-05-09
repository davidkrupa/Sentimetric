"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../database";
import { getCurrentUser } from "./user.actions";
import { GetProjectsSections, ProjectsData, VoidOrError } from "@/types";
import { getAiResponse } from "./openai.actions";
import JobSkills from "../database/models/skills.model";
import Profile from "../database/models/profile.models";
import Ideas from "../database/models/ideas.model";
import { getErrorMessage } from "../utils";
import ProjectSection from "../database/models/project.model";

const prompts = {
  introduction: process.env.PROJECT_INTRODUCTION_SECTION_PROMPT!,
  projectIdea: process.env.PROJECT_IDEA_SECTION_PROMPT!,
  about: process.env.PROJECT_ABOUT_SECTION_PROMPT!,
  conclusion: process.env.PROJECT_CONCLUSION_SECTION_PROMPT!,
};

type SectionTypeOptions =
  | "introduction"
  | "projectIdea"
  | "about"
  | "conclusion";

export const createProjectSection = async (
  sectionId: string | null,
  sectionType: SectionTypeOptions
): Promise<VoidOrError> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const profile = await Profile.findOne({
      userId: user._id,
      _id: user.currentProfile,
    });

    if (!profile) throw new Error("Profile not found");

    const skills = await JobSkills.findOne({
      userId: user._id,
      profileId: user.currentProfile,
    });

    if (!skills) throw new Error("No skills found for the current profile");

    const skillsString = [...skills.hardSkills, ...skills.softSkills].join(
      ", "
    );

    const prompt = prompts[sectionType]
      .replace("{{jobTitle}}", profile.jobTitle)
      .replace("{{skills}}", skills)
      .replace("{{company}}", profile.company)
      .replace("{{industry}}", profile.industry)
      .replace("{{content}}", skillsString);

    const response = await getAiResponse(prompt);

    const projectSection = await ProjectSection.findOneAndUpdate(
      { userId: user._id, profileId: user.currentProfile, sectionId },
      { content: response },
      { upsert: true, new: true }
    );

    if (!projectSection) throw new Error("Error creating project");

    revalidatePath("/dashboard/project");
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const getProjectSections = async (): Promise<GetProjectsSections> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    const sections = await ProjectSection.find({
      userId: user._id,
      profileId: user.currentProfile,
    });

    return { error: null, data: JSON.parse(JSON.stringify(sections)) };
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: null,
    };
  }
};

export const updateCurrentIdeas = async (projectId: string): Promise<void> => {
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

// export const deleteOneProject = async (id: string): Promise<void> => {
//   try {
//     await connectToDatabase();

//     const user = await getCurrentUser();

//     const project = await Project.findOneAndDelete({
//       userId: user._id,
//       profileId: user.currentProfile,
//       _id: id,
//     });

//     if (!project)
//       throw new Error("Error deleting one project. Project not found");

//     revalidatePath("/dashboard");
//   } catch (error) {
//     throw new Error("Error deleting one project");
//   }
// };
