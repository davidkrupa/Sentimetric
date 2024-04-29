import { getShortenedList } from "@/lib/utils";
import ShowAllDialog from "./ShowAllDialog";
import SkillsBadges from "./SkillsBadges";
import { getSkills } from "@/lib/actions/skills.actions";
import NoDataOrError from "./NoDataOrError";

const SkillsViewer = async ({ chars }: { chars: number }) => {
  const { data, error } = await getSkills();

  const isAllowed = !error && data;
  let shortenedHardSkills: string[] = [];
  let shortenedSoftSkills: string[] = [];

  if (data) {
    shortenedHardSkills = getShortenedList(data.hardSkills, chars);
    shortenedSoftSkills = getShortenedList(data.softSkills, chars);
  }

  return (
    <>
      {!isAllowed ? (
        <NoDataOrError defaultText="No skills yet." />
      ) : (
        <div className="space-y-3">
          <div className="space-y-3">
            <p className="text-sm font-medium">Hard Skills</p>
            <SkillsBadges
              skills={shortenedHardSkills}
              type="hardSkills"
              hasMore={data.hardSkills.length > shortenedHardSkills.length}
            >
              <ShowAllDialog
                skills={data.hardSkills}
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
              hasMore={data.softSkills.length > shortenedSoftSkills.length}
            >
              <ShowAllDialog
                skills={data.softSkills}
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
