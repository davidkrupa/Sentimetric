import { getProjectSection } from "@/lib/actions/project.actions";
import { cn } from "@/lib/utils";
import { GenerateContentSectionProps } from "@/types";
import { ScrollArea } from "./ui/scroll-area";

const GenerateContentSection: React.FC<GenerateContentSectionProps> = async ({
  className,
  children,
  title,
  sectionType,
  sectionIndex,
}) => {
  const { data, error } = await getProjectSection(sectionType, sectionIndex);

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row justify-center max-w-5xl gap-5 p-4 border rounded-lg shadow-sm mx-auto ",
        className
      )}
    >
      <div className="flex flex-col justify-center items-center w-full lg:w-1/3 gap-3 rounded-lg bg-card text-card-foreground py-8 mx-auto border shadow-sm">
        <h3 className="text-lg text-muted-foreground">{title}</h3>
        {children}
      </div>
      <div className="w-full lg:w-2/3 bg-muted/50 rounded-lg text-card-foreground py-6 px-2 shadow-sm">
        <ScrollArea className="h-52 text-muted-foreground leading-normal">
          <h2 className="px-6 sm:px-8 mb-4 text-lg text-foreground">
            {data?.topic}
          </h2>
          <p className="text-justify px-6 sm:px-8">
            {data?.content || "No content yet."}
          </p>
        </ScrollArea>
      </div>
    </div>
  );
};

export default GenerateContentSection;
