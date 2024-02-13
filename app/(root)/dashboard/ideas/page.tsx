import AnalysisTitlesScrollable from "@/components/AnalysisTitlesScrollable";
import IdeasSummary from "@/components/IdeasSummary";
import ProfileDetails from "@/components/ProfileDetails";
import SkillsViewer from "@/components/SkillsViewer";
import { Separator } from "@/components/ui/separator";

const MAX_CHARS = 80;

const Page = async () => {
  return (
    <main className="rounded-lg border shadow-sm p-6 space-y-6">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 space-y-3">
            <ProfileDetails showCompany showIndustry />
            <Separator />
          </div>
          <div className="col-span-2">
            <SkillsViewer chars={MAX_CHARS} />
          </div>
          <AnalysisTitlesScrollable />
        </div>
        <Separator className="my-4" />
      </div>
      <IdeasSummary />
    </main>
  );
};

export default Page;
