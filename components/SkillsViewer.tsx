import { getShortenedList } from "@/lib/utils";
import ShowAllDialog from "./ShowAllDialog";
import SkillsBadges from "./SkillsBadges";
import { getSkills } from "@/lib/actions/skills.actions";

const SkillsViewer = async ({ chars }: { chars: number }) => {
  const { hardSkills, softSkills } = await getSkills();

  if (hardSkills?.length === 0 && softSkills?.length === 0)
    return <p>No skills yet.</p>;

  const shortenedHardSkills = getShortenedList(hardSkills, chars);
  const shortenedSoftSkills = getShortenedList(softSkills, chars);

  return (
    <div className="space-y-3">
      <div className="space-y-3">
        <p className="text-sm font-medium">Hard Skills</p>
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
      <div className="space-y-3">
        <p className="text-sm font-medium">Soft Skills</p>
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
  );
};

export default SkillsViewer;
