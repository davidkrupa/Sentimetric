import { ShadcnJobDataForm } from "@/components/ShadcnJobDataForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShadcnUserSkillsForm } from "@/components/ShadcnUserSkillsForm";
import SkillsBadges from "@/components/SkillsBadges";
import { getSkills } from "@/lib/actions/skills.actions";
import { UserSkills } from "@/types";
import { RechartsBarChart } from "@/components/RechartsBarChart";

const Page = async () => {
  const { hardSkills, softSkills }: UserSkills = await getSkills();

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

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3">
          {/* <Badge variant="outline" className="px-3 py-1 relative group">
            Leadership
            <button className="hidden group-hover:block text-white absolute top-0 right-0 bg-destructive pr-3 pl-2 py-1 rounded-r-full transition ease-out">
            X
            </button>
          </Badge> */}
          <div className="col-span-2">
            <Separator className="mb-2" />
            <div>
              <p className="text-sm font-medium mb-1">Hard Skills</p>
              <SkillsBadges skills={hardSkills} />
              <p className="text-sm font-medium mb-1 mt-2">Soft Skills</p>
              <SkillsBadges skills={softSkills} />
            </div>
          </div>
          <div className="grid place-items-center max-w-[350px] ml-auto">
            <RechartsBarChart />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
