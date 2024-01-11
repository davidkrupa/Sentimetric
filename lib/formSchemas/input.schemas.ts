import * as z from "zod";

export const FormSchema = z.object({
  jobTitle: z
    .string()
    .min(3, {
      message: "Job title must be at least 3 characters",
    })
    .max(40, {
      message: "Job title must be at max 40 characters",
    }),
});
