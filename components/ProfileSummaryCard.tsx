import { getSkills } from "@/lib/actions/skills.actions";
import { RechartsBarChart } from "./RechartsBarChart";
import SkillsViewer from "./SkillsViewer";
import ProfileDetails from "./ProfileDetails";

const MAX_CHARS = 80;
const ProfileSummaryCard = async () => {
  const skills = await getSkills();

  const data = [
    {
      name: "Hard Skills",
      total: skills?.data?.hardSkills.length ?? 0,
    },
    {
      name: "Soft Skills",
      total: skills?.data?.softSkills.length ?? 0,
    },
  ];

  return (
    <div className="md:col-span-2 grid sm:grid-cols-3 border rounded-lg shadow-sm p-6 gap-6 sm:gap-0">
      <div className="sm:col-span-2 grid gap-6 place-content-start">
        <ProfileDetails showCompany showIndustry={false} />
        <SkillsViewer chars={MAX_CHARS} />
      </div>
      <div className="grid place-items-center sm:max-w-[300px]">
        <RechartsBarChart data={data} />
      </div>
    </div>
  );
};

export default ProfileSummaryCard;
