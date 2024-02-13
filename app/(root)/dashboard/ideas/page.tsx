import AnalysisTitlesScrollable from "@/components/AnalysisTitlesScrollable";
import IdeasSummary from "@/components/IdeasSummary";
import ProfileDetails from "@/components/ProfileDetails";
import SkillsViewer from "@/components/SkillsViewer";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const MAX_CHARS = 80;

const Page = async () => {
  return (
    <main className="rounded-lg border shadow-sm p-6 space-y-6">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="grid col-span-3 gap-4">
            <Suspense fallback={<Skeleton className="h-10 max-w-[600px]" />}>
              <ProfileDetails showCompany showIndustry />
            </Suspense>
            <Separator />
          </div>
          <div className="col-span-2">
            <Suspense fallback={<Skeleton className="h-36" />}>
              <SkillsViewer chars={MAX_CHARS} />
            </Suspense>
          </div>
          <Suspense fallback={<Skeleton />}>
            <AnalysisTitlesScrollable />
          </Suspense>
        </div>
        <Separator className="my-4" />
      </div>
      <Suspense fallback={<Skeleton className="h-36" />}>
        <IdeasSummary />
      </Suspense>
    </main>
  );
};

export default Page;
