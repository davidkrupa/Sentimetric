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
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UserReview } from "@/lib/formSchemas/input.schemas";
import LoadingSpinner from "./ui/LoadingSpinner";
import { showToastError, showToastSuccess } from "@/lib/utils";
import { createReview } from "@/lib/actions/review.actions";

export function ShadcnReviewForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserReview>>({
    resolver: zodResolver(UserReview),
    defaultValues: {
      review: "",
    },
  });

  const resetFormValues = async () => {
    form.setValue("review", "");
  };

  const onSubmit = async (data: z.infer<typeof UserReview>) => {
    setIsLoading(true);
    const review = await createReview(data.review);
    if (review?.error) {
      showToastError(review.error);
      setIsLoading(false);
      return;
    }
    await resetFormValues();
    showToastSuccess("Review sent successfully");
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl"
      >
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="" className="min-h-40" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-3">
          <Button type="submit" disabled={isLoading}>
            Send Your Review
          </Button>
          {isLoading && <LoadingSpinner />}
        </div>
      </form>
    </Form>
  );
}
