import { getCurrentIdeas, getIdeas } from "@/lib/actions/ideas.actions";
import GenerateContentSection from "./GenerateContentSection";
import IdeaPicker from "./IdeaPicker";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

const IdeasSections = async () => {
  // amount of ideascards
  const array = Array(3).fill(null);

  const ideas = await getIdeas();
  const currentIdea = await getCurrentIdeas();

  const titles =
    ideas.data?.formatted.map((idea) => {
      return { title: idea.title, id: idea._id };
    }) ?? [];

  return (
    <>
      {array.map((_, index) => (
        <Suspense
          key={`idea-${index}`}
          fallback={<Skeleton className="h-44 w-full mb-3" />}
        >
          <GenerateContentSection
            title={`Project Idea #${index + 1}`}
            sectionType="projectIdea"
            sectionIndex={index}
            className="border-dashed"
          >
            <IdeaPicker
              titles={titles}
              index={index}
              currentIdea={currentIdea.data?.[index] ?? null}
              currentIdeaError={currentIdea.error}
            />
          </GenerateContentSection>
        </Suspense>
      ))}
    </>
  );
};

export default IdeasSections;
