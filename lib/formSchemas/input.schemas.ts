import * as z from "zod";

export const DEFAULT_GROUPS = ["hard skills", "soft skills"] as const;

export const JobDetailsFormSchema = z.object({
  jobTitle: z
    .string()
    .min(3, { message: "Job title must be at least 3 characters" })
    .max(40, { message: "Job title must be at max 40 characters" }),
  company: z
    .string()
    .min(3, { message: "Company name must be at least 3 characters" })
    .max(60, { message: "Company name must be at max 60 characters" }),
  industry: z
    .string()
    .min(3, { message: "Industry must be at least 3 characters" })
    .max(40, { message: "Industry must be at max 40 characters" }),
});

export const UserSkillsFormSchema = z.object({
  skillGroup: z.enum(DEFAULT_GROUPS, {
    required_error: "Please select a skill group.",
  }),
  skill: z
    .string()
    .min(1, { message: "Skill name must be at least 1 character" })
    .max(60, { message: "Skill name must be at max 60 characters" }),
});

export const CompanyAnalysisFormSchema = z.object({
  topic: z
    .string()
    .max(200, { message: "Topic must be at max 200 characters" }),
  content: z
    .string()
    .min(300, { message: "Content must be at least 300 characters" })
    .max(5000, { message: "Content must be at max 5000 characters" }),
});
