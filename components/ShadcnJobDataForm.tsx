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
import { FormSchema } from "@/lib/formSchemas/input.schemas";

export function ShadcnJobDataForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      industry: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // const prompt = `Please provide a brief description of the position of ${data.jobTitle} for a person who wants to apply for this position. Please focus on writing a list of skills that are important for this position. Please divide skills into hard and soft. Word limit 300.`;
    // const skills = await getAiResponse(prompt);
    // console.log(skills);
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
                <Input placeholder="Scrum Master" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company name</FormLabel>
              <FormControl>
                <Input placeholder="Google" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Input placeholder="Computer Software" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save Job Details</Button>
      </form>
    </Form>
  );
}
