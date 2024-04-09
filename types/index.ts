import { ReactNode } from "react";

export type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
  currentProfile: string | null;
};

export type UserParams = CreateUserParams & {
  _id: string;
};

export type UpdateUserParams = {
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

export type UserSkills = {
  hardSkills: string[];
  softSkills: string[];
};

export type SkillBadgesProps = {
  skills: string[];
  type: "hardSkills" | "softSkills";
  hasMore: boolean;
  children?: ReactNode;
};

export type SingleAnalysisData = {
  topic: string;
  content: string;
  _id: string;
  createdAt: string;
};

export type SaveAnalysisParams = {
  topic: string;
  content: string;
};

export type ProfileParams = {
  jobTitle: string;
  company: string;
  industry: string;
};

type BarChartItem = {
  name: string;
  total: number;
};

export type BarChartProps = {
  data: BarChartItem[];
};

export type SingleProfileData = {
  jobTitle: string;
  company: string;
  industry: string;
  _id: string;
  userId: string;
};

export type ProfilesData = {
  currentProfileId: string | null;
  profiles: SingleProfileData[];
};

export type SelectMenuProps = {
  data: SingleProfileData[];
  currentProfile: SingleProfileData | undefined;
};

export type DeleteBadgeButtonProps = {
  skill: string;
  type: string;
};

export type ProfileDetailsProps = {
  showCompany: boolean;
  showIndustry: boolean;
};

type LineChartSingleElement = {
  day: string;
  activities: number;
};

export type LineChartProps = {
  data: LineChartSingleElement[];
};

export type ProjectsData = {
  name: string;
  topic: string;
  content: string;
  userId: string;
  createdAt: Date;
};

export type IdeasData = {
  content: string;
  createdAt: string;
};

export type NameOptions = "skill" | "project" | "analysis" | "profile";

export type ActionOptions = "added" | "removed";

export type ActivitiesAmountByDay = {
  day: string;
  activities: number;
};
