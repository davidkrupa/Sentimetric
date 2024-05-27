"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { JobDetailsFormSchema } from "@/lib/formSchemas/input.schemas";
import { addProfile } from "@/lib/actions/profile.actions";
import { createActivity } from "@/lib/actions/activities.actions";
import LoadingSpinner from "./ui/LoadingSpinner";
import { showToastError, showToastSuccess } from "@/lib/utils";

export function ShadcnJobDataForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof JobDetailsFormSchema>>({
    resolver: zodResolver(JobDetailsFormSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      industry: "",
    },
  });

  const resetFormValues = async () => {
    form.setValue("jobTitle", "");
    form.setValue("company", "");
    form.setValue("industry", "");
  };

  const onSubmit = async (data: z.infer<typeof JobDetailsFormSchema>) => {
    setIsLoading(true);
    const profile = await addProfile(data);
    if (profile?.error) {
      showToastError(profile.error);
      setIsLoading(false);
      return;
    }
    await createActivity("profile", "added");
    await resetFormValues();
    showToastSuccess("New profile created successfully");
    setIsLoading(false);
  };

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
              <FormLabel>Job Title / Area of Interest</FormLabel>
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
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isLoading}>
            Create New Profile
          </Button>
          {isLoading && <LoadingSpinner />}
        </div>
      </form>
    </Form>
  );
}
