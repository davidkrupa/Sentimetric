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

export type CustomAnalysisParams = {
  topic: string;
  content: string;
  _id: string;
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
