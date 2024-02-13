import { getAllAnalysis } from "@/lib/actions/analysis.actions";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

const AnalysisTitlesScrollable = async () => {
  const analysis = await getAllAnalysis();

  return (
    <div className="space-y-3">
      <p>Analysis</p>
      <ScrollArea className="h-40">
        {analysis.map((item, i) => (
          <div className="space-y-1 py-1" key={`analysis-${i}`}>
            {i !== 0 && <Separator />}
            <p className="text-sm text-muted-foreground leading-loose line-clamp-1">
              {item.topic}
            </p>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default AnalysisTitlesScrollable;
