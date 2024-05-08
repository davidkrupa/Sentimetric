import { cn } from "@/lib/utils";
import GenerateContentButton from "./GenerateContentButton";

type GenerateContentSectionProps = {
  className?: string;
  children?: React.ReactNode;
  title: string;
  sectionId: string;
};

const GenerateContentSection: React.FC<GenerateContentSectionProps> = async ({
  className,
  children,
  title,
  sectionId,
}) => {
  // const response = await getSectionContent(sectionId);

  return (
    <div
      className={cn(
        "gap-5 px-4 py-6 max-w-5xl rounded-lg border-2 shadow-sm mx-auto",
        className
      )}
    >
      <div className="flex justify-center gap-5">
        <div className="flex flex-col justify-center items-center w-1/3 gap-3 rounded-lg bg-card text-card-foreground py-8 mx-auto border shadow-sm">
          <h3 className="text-lg text-muted-foreground">{title}</h3>
          {/* <GenerateContentButton sectionId={sectionId} /> */}
          {children}
        </div>
        <div className="w-2/3 bg-card rounded-lg text-card-foreground py-8 border shadow-sm">
          <p className="text-center">Text content from AI</p>
        </div>
      </div>
    </div>
  );
};

export default GenerateContentSection;
