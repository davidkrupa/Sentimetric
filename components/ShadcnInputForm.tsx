"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getAiResponse } from "@/lib/actions/openai.actions";

const FormSchema = z.object({
  jobTitle: z
    .string()
    .min(3, {
      message: "Job title must be at least 3 characters",
    })
    .max(40, {
      message: "Job title must be at max 40 characters",
    }),
});

export function ShadcnInputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      jobTitle: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const prompt = `Please provide a JSON object of the most important hard and soft skills for a person that want to apply to a position: ${data.jobTitle}. Each skill should be assigned to one or more groups of skills e.g: leadership, communication. There should be maximum 5 groups, if needed one of them should be called "other" for skills that don't fit to other groups. There should be minimum 15 and maximum 40 skills in total. Please format your response as follows: {
      hardSkills: [{
        skill: "",
        groups: [],
      }],
      softSkills: [{
        skill: "",
        groups: [],
      }]
    }`;

    const skills = await getAiResponse(prompt);

    console.log(skills);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-5/6 space-y-6 max-w-md"
      >
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Job Title" {...field} />
              </FormControl>
              <FormDescription>eg. Data Analyst</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate List</Button>
      </form>
    </Form>
  );
}
