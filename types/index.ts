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

export type ProfileData = {
  jobTitle: string;
  company: string;
  industry: string;
  _id: string;
  userId: string;
  createdAt: string;
};

export type SelectMenuProps = {
  data: ProfileData[];
  current: string;
};

export type DeleteBadgeButtonProps = {
  skill: string;
  type: string;
};

export type ProfileDetailsProps = {
  showCompany: boolean;
  showIndustry: boolean;
};
