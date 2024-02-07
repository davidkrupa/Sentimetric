import SkillsBadges from "@/components/SkillsBadges";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllAnalysis } from "@/lib/actions/analysis.actions";
import { getSkills } from "@/lib/actions/skills.actions";
import { getShortenedList } from "@/lib/utils";
import { UserSkills } from "@/types";

const MAX_CHARS = 60;

const Page = async () => {
  const [analysis, { hardSkills, softSkills }] = await Promise.all([
    getAllAnalysis(),
    getSkills(),
  ]);

  const shortenedHardSkills = getShortenedList(hardSkills, MAX_CHARS);
  const shortenedSoftSkills = getShortenedList(softSkills, MAX_CHARS);

  return (
    <main className="rounded-lg border shadow-sm p-6">
      <div>
        <div className="flex items-start justify-around gap-4 text-sm ">
          <div className="flex-1">Profile</div>
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">Hard Skills</p>
            <SkillsBadges
              skills={shortenedHardSkills}
              type="hardSkills"
              hasMore={hardSkills.length > shortenedHardSkills.length}
            />
            <p className="text-sm font-medium mb-1 mt-2">Soft Skills</p>
            <SkillsBadges
              skills={shortenedSoftSkills}
              type="softSkills"
              hasMore={softSkills.length > shortenedSoftSkills.length}
            />
          </div>
          <div className="flex-1">
            Analysis
            {analysis.map((item, i) => (
              <p className="text-muted-foreground" key={`analysis-${i}`}>
                {item.topic}
              </p>
            ))}
          </div>
        </div>
        <Separator className="my-4" />
      </div>
      <p className="text-muted-foreground text-sm">
        Content of the analysis of the user profile
      </p>
    </main>
  );
};

export default Page;
