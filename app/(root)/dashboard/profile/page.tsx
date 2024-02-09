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
import {
  getAllProfiles,
  getCurrentProfileId,
} from "@/lib/actions/profile.actions";
import ProfilePicker from "@/components/ProfilePicker";
import { getShortenedList } from "@/lib/utils";
import ShowAllDialog from "@/components/ShowAllDialog";

const MAX_CHARS = 80;

const Page = async () => {
  const { hardSkills, softSkills } = await getSkills();
  const profiles = await getAllProfiles();
  const currentId = await getCurrentProfileId();

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

  const shortenedHardSkills = getShortenedList(hardSkills, MAX_CHARS);
  const shortenedSoftSkills = getShortenedList(softSkills, MAX_CHARS);

  const currentProfile = profiles.find((profile) => profile._id === currentId);

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
        <div className="col-span-2 flex flex-col gap-6">
          <div className="flex gap-6 items-center">
            <ProfilePicker data={profiles} current={currentId} />
            <p>{currentProfile?.company}</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Hard Skills</p>
            <SkillsBadges
              skills={shortenedHardSkills}
              type="hardSkills"
              hasMore={hardSkills.length > shortenedHardSkills.length}
            >
              <ShowAllDialog
                skills={hardSkills}
                type="hardSkills"
                hasMore={false}
              />
            </SkillsBadges>
          </div>
          <div>
            <p className="text-sm font-medium mb-3">Soft Skills</p>
            <SkillsBadges
              skills={shortenedSoftSkills}
              type="softSkills"
              hasMore={softSkills.length > shortenedSoftSkills.length}
            >
              <ShowAllDialog
                skills={softSkills}
                type="softSkills"
                hasMore={false}
              />
            </SkillsBadges>
          </div>
        </div>
        <div className="grid place-items-center max-w-[300px]">
          <RechartsBarChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default Page;
