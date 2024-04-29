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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CompanyAnalysisFormSchema } from "@/lib/formSchemas/input.schemas";
import { createAnalysisAndSave } from "@/lib/actions/analysis.actions";
import { createActivity } from "@/lib/actions/activities.actions";
import { useState } from "react";
import LoadingSpinner from "./ui/LoadingSpinner";
import NoDataOrError from "./NoDataOrError";

export function ShadcnCustomAnalysisForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof CompanyAnalysisFormSchema>>({
    resolver: zodResolver(CompanyAnalysisFormSchema),
    defaultValues: {
      topic: "",
      content: "",
    },
  });

  const resetFormValues = async () => {
    form.setValue("topic", "");
    form.setValue("content", "");
  };

  const onSubmit = async (data: z.infer<typeof CompanyAnalysisFormSchema>) => {
    setIsLoading(true);
    try {
      await createAnalysisAndSave(data);
      await createActivity("analysis", "added");
      await resetFormValues();
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-5/6 space-y-6 max-w-md"
      >
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Topic</FormLabel>
              <FormControl>
                <Input placeholder="About Us Page" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content to be analyzed.</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Content of the About Us page of the company you selected"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isLoading}>
            Generate Analysis
          </Button>
          {isLoading && <LoadingSpinner />}
        </div>
        {error && <NoDataOrError error={error} />}
      </form>
    </Form>
  );
}
