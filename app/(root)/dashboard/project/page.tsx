import { Suspense } from "react";

import GenerateContentSection from "@/components/GenerateContentSection";
import IdeasSections from "@/components/IdeasSections";
import ProjectButtons from "@/components/ProjectButtons";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const Page = async () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col justify-center items-center gap-4 py-8">
        <h2 className="text-center text-3xl">Create Your Project</h2>
        <Suspense
          key={Date.now()}
          fallback={<Skeleton className="h-12 w-32" />}
        >
          <ProjectButtons />
        </Suspense>
      </div>
      <Suspense
        key={Date.now() + 100}
        fallback={<Skeleton className="h-44 w-full max-w-5xl" />}
      >
        <GenerateContentSection
          title="Introduction"
          sectionType="introduction"
        />
      </Suspense>
      <Separator orientation="vertical" className="h-10 w-[2px] mx-auto my-2" />

      <Suspense
        key="ideas-sections"
        fallback={<Skeleton className="h-44 w-full max-w-5xl" />}
      >
        <IdeasSections />
      </Suspense>
      <Separator orientation="vertical" className="h-10 w-[2px] mx-auto my-2" />
      <Suspense
        key={Date.now() + 300}
        fallback={<Skeleton className="h-44 w-full max-w-5xl" />}
      >
        <GenerateContentSection title="Conclusion" sectionType="conclusion" />
      </Suspense>
    </div>
  );
};

export default Page;
