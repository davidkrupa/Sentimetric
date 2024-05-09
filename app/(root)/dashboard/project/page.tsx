import GenerateContentButton from "@/components/GenerateContentButton";
import GenerateContentSection from "@/components/GenerateContentSection";
import IdeasSections from "@/components/IdeasSections";
import { Separator } from "@/components/ui/separator";

const Page = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4 py-8">
        <h2 className="text-center text-3xl">Create Your Project</h2>
        <GenerateContentButton />
      </div>
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
