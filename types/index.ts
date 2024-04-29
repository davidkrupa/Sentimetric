import { ReactNode } from "react";

export type CreateUserParams = {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  photo: string;
  currentProfile: string | null;
};

export type UserParams = CreateUserParams & {
  _id: string;
};

export type UpdateUserParams = {
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

export type NameOptions = "skill" | "project" | "analysis" | "profile" | "idea";

export type ActionOptions = "added" | "removed";

export type ActivitiesAmountByDayData = {
  day: string;
  activities: number;
};

export type ErrorMessage = string | null;

export type Result<Data> = {
  error: ErrorMessage;
  data: Data;
};

export type GetDoSkillsExist = Result<boolean>;

export type GetSkills = Result<UserSkills | null>;

export type ActivitiesData = {
  name: NameOptions;
  action: ActionOptions;
  total: number;
  createdAt: string;
};

export type GetLastActivities = Result<ActivitiesData[] | null>;

export type GetActivitiesAmountByDay = Result<
  ActivitiesAmountByDayData[] | null
>;

export type ActivitiesAmountData = {
  _id: { name: NameOptions; action: ActionOptions };
  total: number;
};

export type GetActivitiesAmountByName = Result<ActivitiesAmountData[] | null>;

export type GetDoesProfileExist = Result<boolean>;

export type GetAllProfiles = Result<ProfilesData | null>;

export type GetDoesAnalysisExist = Result<boolean>;

export type GetCurrentAnalysis = Result<SingleAnalysisData | null>;

export type GetAllAnalysis = Result<SingleAnalysisData[] | []>;

export type GetIdeas = Result<IdeasData | null>;

export type VoidOrError = void | { error: string };
