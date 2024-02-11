import { getSkills } from "@/lib/actions/skills.actions";
import ProfilePicker from "./ProfilePicker";
import ShowAllDialog from "./ShowAllDialog";
import SkillsBadges from "./SkillsBadges";
import {
  getAllProfiles,
  getCurrentProfileId,
} from "@/lib/actions/profile.actions";
import { getShortenedList } from "@/lib/utils";
import { RechartsBarChart } from "./RechartsBarChart";

const MAX_CHARS = 80;

const ProfileSummaryCard = async () => {
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
  );
};

export default ProfileSummaryCard;
