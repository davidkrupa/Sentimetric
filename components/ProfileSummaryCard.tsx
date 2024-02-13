import { getSkills } from "@/lib/actions/skills.actions";
import { RechartsBarChart } from "./RechartsBarChart";
import SkillsViewer from "./SkillsViewer";
import ProfileDetails from "./ProfileDetails";

const MAX_CHARS = 80;
const ProfileSummaryCard = async () => {
  const { hardSkills, softSkills } = await getSkills();
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
    <div className="col-span-2 grid grid-cols-3 border rounded-lg shadow-sm p-6">
      <div className="col-span-2 flex flex-col gap-6">
        <ProfileDetails showCompany showIndustry={false} />
        <SkillsViewer chars={MAX_CHARS} />
      </div>
      <div className="grid place-items-center max-w-[300px]">
        <RechartsBarChart data={data} />
      </div>
    </div>
  );
};

export default ProfileSummaryCard;
