import { Suspense } from "react";

import AnalysisTitlesScrollable from "@/components/AnalysisTitlesScrollable";
import SkillsViewer from "@/components/SkillsViewer";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import SummaryCards from "@/components/SummaryCards";

const MAX_CHARS = 80;

const Page = async () => {
  return (
    <div className="">
      {/* user profile data */}
      {/* <div className="space-y-6">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="sm:col-span-2 ml-6 mr-4 sm:ml-0 sm:mr-0">
            <Suspense fallback={<Skeleton className="h-48" />} key={Date.now()}>
              <SkillsViewer chars={MAX_CHARS} />
            </Suspense>
          </div>
          <Suspense fallback={<Skeleton />}>
            <AnalysisTitlesScrollable />
          </Suspense>
        </div>
        <Separator />
      </div> */}

      <Suspense fallback={<Skeleton className="h-44" />} key={Date.now()}>
        <SummaryCards />
      </Suspense>
    </div>
  );
};

export default Page;
