"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "../database";
import { getCurrentUser } from "./user.actions";
import { GetProjectsSections, SectionTypeOptions, VoidOrError } from "@/types";
import { getAiResponse } from "./openai.actions";
import JobSkills from "../database/models/skills.model";
import Profile from "../database/models/profile.models";
import Ideas from "../database/models/ideas.model";
import { getErrorMessage } from "../utils";
import ProjectSection from "../database/models/project.model";
import CompanySummary from "../database/models/summary.model";

const prompts = {
  introduction: process.env.PROJECT_INTRODUCTION_SECTION_PROMPT!,
  projectIdea: process.env.PROJECT_IDEA_SECTION_PROMPT!,
  about: process.env.PROJECT_ABOUT_SECTION_PROMPT!,
  conclusion: process.env.PROJECT_CONCLUSION_SECTION_PROMPT!,
};

export const createProjectSection = async (
  sectionType: SectionTypeOptions,
  sectionName?: string | null
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

    const summary = await CompanySummary.findOne({
      userId: user._id,
      profileId: user.currentProfile,
    });

    const prompt = prompts[sectionType]
      .replace("{{jobTitle}}", profile.jobTitle)
      .replace("{{skills}}", skillsString)
      .replace("{{company}}", profile.company)
      .replace("{{industry}}", profile.industry)
      .replace("{{summary}}", summary.content);

    const response = await getAiResponse(prompt);

    const projectSection = await ProjectSection.findOneAndUpdate(
      {
        userId: user._id,
        profileId: user.currentProfile,
        "section.name": sectionType,
      },
      { content: response, topic: sectionName },
      { upsert: true, new: true }
    );

    if (!projectSection) throw new Error("Error creating project");

    revalidatePath("/dashboard/project");
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const createProjectIdeaSection = async (
  index: number
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

    const summary = await CompanySummary.findOne({
      userId: user._id,
      profileId: user.currentProfile,
    });

    const ideas = await Ideas.findOne({
      userId: user._id,
      profileId: user.currentProfile,
    });

    const currentIdea = ideas.formatted[index];

    const prompt = prompts.projectIdea
      .replace("{{jobTitle}}", profile.jobTitle)
      .replace("{{skills}}", skillsString)
      .replace("{{company}}", profile.company)
      .replace("{{industry}}", profile.industry)
      .replace("{{summary}}", summary.content)
      .replace("{{projectTitle}}", currentIdea.title)
      .replace("{{projectExplanation}}", currentIdea.explanation);

    const response = await getAiResponse(prompt);

    let schemaId = null;

    const pickedFormatted = ideas.pickedFormattedIds[index];
    if (pickedFormatted) {
      schemaId = pickedFormatted.formatted;
    }

    const projectSectionData = {
      userId: user._id,
      profileId: user.currentProfile,
      section: {
        name: "projectIdea",
        refKeyword: "Ideas.formatted",
        schemaId: schemaId,
      },
      content: response,
    };

    const projectSection = await ProjectSection.findOneAndUpdate(
      {
        userId: user._id,
        profileId: user.currentProfile,
        "section.name": "projectIdea",
        "section.schemaId": schemaId,
      },
      { $set: { content: response, topic: currentIdea.title } },
      { upsert: true, new: true }
    );

    if (!projectSection) throw new Error("Error creating project");

    revalidatePath("/dashboard/project");
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

export const getProjectSection = async (
  sectionType: SectionTypeOptions,
  sectionIndex?: number
): Promise<GetProjectsSections> => {
  try {
    await connectToDatabase();

    const user = await getCurrentUser();

    // static sections - introduction, about, conclusion

    if (sectionIndex == null) {
      const section = await ProjectSection.findOne({
        userId: user._id,
        profileId: user.currentProfile,
        "section.name": sectionType,
      });

      return { error: null, data: JSON.parse(JSON.stringify(section)) };
    }

    // dynamic sections - projectIdea

    const ideas = await Ideas.findOne({
      userId: user._id,
      profileId: user.currentProfile,
    });

    // id of the formatted idea
    const pickedIdeaId = ideas.pickedFormattedIds[sectionIndex].formatted;

    const section = await ProjectSection.findOne({
      userId: user._id,
      profileId: user.currentProfile,
      "section.name": sectionType,
      "section.schemaId": pickedIdeaId,
    });

    return { error: null, data: JSON.parse(JSON.stringify(section)) };
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
