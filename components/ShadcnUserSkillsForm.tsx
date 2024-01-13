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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  DEFAULT_GROUPS,
  UserSkillsFormSchema,
} from "@/lib/formSchemas/input.schemas";

export function ShadcnUserSkillsForm() {
  const [skills, setSkills] = useState<string[]>([]);
  const form = useForm<z.infer<typeof UserSkillsFormSchema>>({
    resolver: zodResolver(UserSkillsFormSchema),
    defaultValues: {
      skillGroup: DEFAULT_GROUPS[0],
      skill: "",
    },
  });

  async function onSubmit(data: z.infer<typeof UserSkillsFormSchema>) {
    console.log(data.skill);
    setSkills((prev: string[]) => [...prev, data.skill]);
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
                    <SelectItem key={group} value={group}>
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
        <Button type="submit">Add Skill</Button>
      </form>
      <div>
        {skills.map((skill) => (
          <p key={skill} className="border rounded-full p-3 text-white">
            {skill}
          </p>
        ))}
      </div>
    </Form>
  );
}
