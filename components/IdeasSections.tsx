import { getCurrentIdeas, getIdeas } from "@/lib/actions/ideas.actions";
import GenerateContentSection from "./GenerateContentSection";
import IdeaPicker from "./IdeaPicker";

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
        <GenerateContentSection
          key={index}
          title={`Project Idea #${index + 1}`}
          sectionId={`idea-${index + 1}`}
          className="border-dashed"
        >
          <IdeaPicker
            titles={titles}
            index={index}
            currentIdea={currentIdea.data?.[index] ?? null}
            currentIdeaError={currentIdea.error}
          />
        </GenerateContentSection>
      ))}
    </>
  );
};

export default IdeasSections;
