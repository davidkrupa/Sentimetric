import { getAllAnalysis } from "@/lib/actions/analysis.actions";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { IoTrashOutline } from "react-icons/io5";

const AnalysisTitlesScrollable = async () => {
  const analysis = await getAllAnalysis();

  return (
    <div className="space-y-3 relative">
      <p className="ml-6">Analysis</p>
      <ScrollArea className="h-40">
        {analysis.map((item, i) => (
          <div className="space-y-1 py-1 relative group" key={`analysis-${i}`}>
            {i !== 0 && <Separator />}
            <div className="group-hover:bg-muted/50 rounded-md">
              <button className="absolute left-1 bottom-2 hidden group-hover:block rounded-sm p-0.5">
                <IoTrashOutline className="text-sm text-primary" />
              </button>
              <p className="text-sm text-muted-foreground leading-loose line-clamp-1 ml-6">
                {item.topic}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default AnalysisTitlesScrollable;
