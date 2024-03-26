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

export function ShadcnCustomAnalysisForm() {
  const form = useForm<z.infer<typeof CompanyAnalysisFormSchema>>({
    resolver: zodResolver(CompanyAnalysisFormSchema),
    defaultValues: {
      topic: "",
      content: "",
    },
  });

  async function onSubmit(data: z.infer<typeof CompanyAnalysisFormSchema>) {
    createAnalysisAndSave(data);
  }

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
        <Button type="submit">Generate Analysis</Button>
      </form>
    </Form>
  );
}
