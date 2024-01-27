import { ShadcnJobDataForm } from "@/components/ShadcnJobDataForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShadcnUserSkillsForm } from "@/components/ShadcnUserSkillsForm";
import SkillsBadges from "@/components/SkillsBadges";
import { getSkills } from "@/lib/actions/skills.actions";
import { UserSkills } from "@/types";
import { RechartsBarChart } from "@/components/RechartsBarChart";

const Page = async () => {
  const { hardSkills, softSkills }: UserSkills = await getSkills();

  const data = [
    {
      name: "Hard Skills",
      total: hardSkills.length,
    },
    {
      name: "Soft Skills",
      total: softSkills.length,
    },
  ];

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
        <CardFooter></CardFooter>
      </Card>

      <div className="col-span-2 grid grid-cols-3 border rounded-lg shadow-sm p-6">
        <div className="col-span-2 flex flex-col">
          <p className="text-sm font-medium mb-3">Hard Skills</p>
          <SkillsBadges skills={hardSkills} />
          <p className="text-sm font-medium mb-3 mt-5">Soft Skills</p>
          <SkillsBadges skills={softSkills} />
        </div>
        <div className="grid place-items-center max-w-[300px]">
          <RechartsBarChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default Page;
