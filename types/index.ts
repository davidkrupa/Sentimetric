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

type ProjectDataSection = {
  name: string;
  refKeyword: string;
  schemaId: string;
};

export type ProjectsData = {
  topic: string;
  content: string;
  section: ProjectDataSection;
  userId: string;
  createdAt: Date;
};

type FormattedResponse = {
  title: string;
  explanation: string;
  index: number;
  _id: string;
};

export type IdeasData = {
  content: string;
  formatted: FormattedResponse[];
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

export type GetSkills = Result<UserSkills | null>;

export type ActivitiesData = {
  name: NameOptions;
  action: ActionOptions;
  total: number;
  createdAt: string;
};

export type FormatTextResults = {
  index: number;
  title: string;
  explanation: string;
};

export type PickedFormattedIds = {
  index: number;
  formatted: string | null;
};

export type GetLastActivities = Result<ActivitiesData[] | null>;

export type GetActivitiesAmountByDay = Result<
  ActivitiesAmountByDayData[] | null
>;

export type ActivitiesAmountData = {
  _id: { name: NameOptions; action: ActionOptions };
  total: number;
};

type CompanySummaryData = {
  content: string;
};

export type GetDoesExist = Result<boolean>;

export type GetActivitiesAmountByName = Result<ActivitiesAmountData[] | null>;

export type GetAllProfiles = Result<ProfilesData | null>;

export type GetCurrentAnalysis = Result<SingleAnalysisData | null>;

export type GetAllAnalysis = Result<SingleAnalysisData[] | []>;

export type GetIdeas = Result<IdeasData | null>;

export type VoidOrError = void | { error: string };

export type GetCompanySummary = Result<CompanySummaryData | null>;

export type GetProjectsSections = Result<ProjectsData | null>;

export type FormatedIdea = FormatTextResults & { _id: string };

export type GetCurrentIdeas = Result<FormatedIdea[] | null>;

type TitlesData = {
  title: string;
  id: string;
};

export type IdeaPickerProps = {
  titles: TitlesData[];
  index: number;
  currentIdea: FormatedIdea | null;
  currentIdeaError: ErrorMessage;
};

export type SectionTypeOptions =
  | "introduction"
  | "about"
  | "conclusion"
  | "projectIdea";

export type GenerateContentSectionProps = {
  className?: string;
  children?: React.ReactNode;
  title: string;
  sectionType: SectionTypeOptions;
  sectionIndex?: number;
};

export type TransactionModes = "subscription" | "payment";

export type PricingCardButtonProps = {
  transactionMode: TransactionModes | null;
  userId: string | null;
};

export type PricingCardData = {
  title: string;
  price: string;
  description: string;
  features: string[];
  excludedFeatures: string[];
  transactionMode: TransactionModes | null;
};

export type CreateTransactionParams = {
  stripeId: string;
  buyerClerkId: string;
  createdAt: Date;
};
