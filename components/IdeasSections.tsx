import GenerateContentSection from "./GenerateContentSection";
import IdeaPicker from "./IdeaPicker";

const IdeasSections = () => {
  const array = Array(3).fill(null);

  return (
    <>
      {array.map((_, index) => (
        <GenerateContentSection
          key={index}
          title={`Project Idea #${index + 1}`}
          sectionId={`idea-${index + 1}`}
          className="border-dashed mb-2"
        >
          <IdeaPicker />
        </GenerateContentSection>
      ))}
    </>
  );
};

export default IdeasSections;
