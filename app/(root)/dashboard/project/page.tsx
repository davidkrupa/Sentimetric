import GenerateContentSection from "@/components/GenerateContentSection";
import IdeasSections from "@/components/IdeasSections";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  return (
    <div>
      <h2 className="text-center text-3xl mb-8">Create Your Project</h2>
      <GenerateContentSection title="Introduction" sectionId="introduction" />
      <Separator orientation="vertical" className="h-10 w-[2px] mx-auto my-2" />
      <IdeasSections />
      <Separator orientation="vertical" className="h-10 w-[2px] mx-auto my-2" />
      <GenerateContentSection
        title="About You"
        sectionId="about"
        className=" mb-2"
      />
      <GenerateContentSection title="Conclusion" sectionId="conclusion" />
    </div>
  );
};

export default Page;
