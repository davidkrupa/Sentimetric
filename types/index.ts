export type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
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
