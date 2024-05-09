import { cn } from "@/lib/utils";

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
        "flex flex-col md:flex-row justify-center max-w-5xl gap-5 p-4 border rounded-lg shadow-sm mx-auto ",
        className
      )}
    >
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 lg:w-1/3 gap-3 rounded-lg bg-card text-card-foreground py-8 mx-auto border shadow-sm">
        <h3 className="text-lg text-muted-foreground">{title}</h3>
        {children}
      </div>
      <div className="w-full md:w-1/2 lg:w-2/3 bg-muted/50 rounded-lg text-card-foreground py-8  shadow-sm">
        <p className="text-center">Text content from AI</p>
      </div>
    </div>
  );
};

export default GenerateContentSection;
