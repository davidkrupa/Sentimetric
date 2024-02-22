import { Suspense } from "react";

import { ShadcnJobDataForm } from "@/components/ShadcnJobDataForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShadcnUserSkillsForm } from "@/components/ShadcnUserSkillsForm";
import ProfileSummaryCard from "@/components/ProfileSummaryCard";
import { Skeleton } from "@/components/ui/skeleton";

const Page = async () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Profile</CardTitle>
          <CardDescription>
            Enter basic data about your new profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ShadcnJobDataForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Your Skills</CardTitle>
          <CardDescription>
            Enter your skills that will be used in the analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ShadcnUserSkillsForm />
        </CardContent>
      </Card>

      <Suspense
        fallback={<Skeleton className="h-56 md:col-span-2 rounded-md" />}
      >
        <ProfileSummaryCard />
      </Suspense>
    </div>
  );
};

export default Page;
