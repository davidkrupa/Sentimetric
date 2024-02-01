export type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
  currentProfile: string | null;
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
  hasMore: boolean;
};

export type CustomAnalysisParams = {
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

export type ProfilePickerProps = {
  data: ProfileData[];
  current: string;
};
