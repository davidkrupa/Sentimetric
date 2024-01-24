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
import { JobDetailsFormSchema } from "@/lib/formSchemas/input.schemas";
import { addProfile } from "@/lib/actions/profile.actions";

export function ShadcnJobDataForm() {
  const form = useForm<z.infer<typeof JobDetailsFormSchema>>({
    resolver: zodResolver(JobDetailsFormSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      industry: "",
    },
  });

  async function onSubmit(data: z.infer<typeof JobDetailsFormSchema>) {
    await addProfile(data);
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
        <Button type="submit">Create New Profile</Button>
      </form>
    </Form>
  );
}
