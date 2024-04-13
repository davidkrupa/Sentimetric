import { getAllAnalysis } from "@/lib/actions/analysis.actions";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import DeleteButton from "./DeleteButton";

const AnalysisTitlesScrollable = async () => {
  const analysis = await getAllAnalysis();

  if (!analysis) return;

  return (
    <div className="space-y-3 relative">
      <p className="ml-6">Analysis</p>
      <ScrollArea className="h-40">
        {analysis.map((item, i) => (
          <div className="space-y-1 py-1 relative group" key={`analysis-${i}`}>
            {i !== 0 && <Separator />}
            <div className="group-hover:bg-muted/50 rounded-md">
              <DeleteButton id={item._id} />
              <p className="text-sm text-muted-foreground leading-loose line-clamp-1 ml-6">
                {item?.topic}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default AnalysisTitlesScrollable;
