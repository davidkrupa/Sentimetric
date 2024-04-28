import { getShortenedList } from "@/lib/utils";
import ShowAllDialog from "./ShowAllDialog";
import SkillsBadges from "./SkillsBadges";
import { getSkills } from "@/lib/actions/skills.actions";
import NoDataOrError from "./NoDataOrError";

const SkillsViewer = async ({ chars }: { chars: number }) => {
  const {
    data: { hardSkills, softSkills },
    error,
  } = await getSkills();

  const isListEmpty = hardSkills.length === 0 && softSkills.length === 0;

  const shortenedHardSkills = getShortenedList(hardSkills, chars);
  const shortenedSoftSkills = getShortenedList(softSkills, chars);

  return (
    <>
      {isListEmpty ? (
        <NoDataOrError defaultText="No skills yet." error={error} />
      ) : (
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
      )}
    </>
  );
};

export default SkillsViewer;
