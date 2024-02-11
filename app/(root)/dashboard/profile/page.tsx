import { ShadcnJobDataForm } from "@/components/ShadcnJobDataForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShadcnUserSkillsForm } from "@/components/ShadcnUserSkillsForm";
import { Suspense } from "react";
import ProfileSummaryCard from "@/components/ProfileSummaryCard";
import SkeletonFullWidth from "@/components/SkeletonFullWidth";

const Page = async () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Target Job Data</CardTitle>
          <CardDescription>
            Enter basic data to get a personalized analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ShadcnJobDataForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Skills</CardTitle>
          <CardDescription>
            Enter your skills related to the new job position.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ShadcnUserSkillsForm />
        </CardContent>
      </Card>

      <Suspense fallback={<SkeletonFullWidth />}>
        <ProfileSummaryCard />
      </Suspense>
    </div>
  );
};

export default Page;
