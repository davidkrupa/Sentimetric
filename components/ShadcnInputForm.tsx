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

export function ShadcnInputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      jobTitle: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const prompt = `Please provide a brief description of the position of ${data.jobTitle} for a person who wants to apply for this position. Please focus on writing a list of skills that are important for this position. Please divide skills into hard and soft. Word limit 300.`;

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
