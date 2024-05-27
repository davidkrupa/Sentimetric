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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  DEFAULT_GROUPS,
  UserSkillsFormSchema,
} from "@/lib/formSchemas/input.schemas";
import { addSkills } from "@/lib/actions/skills.actions";
import { UserSkills } from "@/types";
import { createActivity } from "@/lib/actions/activities.actions";
import LoadingSpinner from "./ui/LoadingSpinner";
import { showToastError, showToastSuccess } from "@/lib/utils";

export function ShadcnUserSkillsForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserSkillsFormSchema>>({
    resolver: zodResolver(UserSkillsFormSchema),
    defaultValues: {
      skillGroup: DEFAULT_GROUPS[0],
      skill: "",
    },
  });

  async function onSubmit(data: z.infer<typeof UserSkillsFormSchema>) {
    setIsLoading(true);
    const { skillGroup, skill } = data;

    const skills: UserSkills = {
      hardSkills: [],
      softSkills: [],
    };

    if (skillGroup === "hard skills") {
      skills.hardSkills = [skill.toLowerCase().trim()];
    }
    if (skillGroup === "soft skills") {
      skills.softSkills = [skill.toLowerCase().trim()];
    }

    const skillsData = await addSkills(skills);
    if (skillsData?.error) {
      showToastError(skillsData.error);
      setIsLoading(false);
      return;
    }
    form.setValue("skill", ""); // clear skill input after submit
    await createActivity("skill", "added");
    showToastSuccess("Skill added successfully!");
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-5/6 space-y-6 max-w-md"
      >
        <FormField
          control={form.control}
          name="skillGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Group</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a skills group" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {DEFAULT_GROUPS.map((group) => (
                    <SelectItem
                      key={group}
                      value={group}
                      className="capitalize"
                    >
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skill"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill</FormLabel>
              <FormControl>
                <Input placeholder="Leadership" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-3">
          <Button type="submit">Add Skill</Button>
          {isLoading && <LoadingSpinner />}
        </div>
      </form>
    </Form>
  );
}
