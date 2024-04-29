import { getAllAnalysis } from "@/lib/actions/analysis.actions";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import DeleteButton from "./DeleteButton";
import NoDataOrError from "./NoDataOrError";

const AnalysisTitlesScrollable = async () => {
  const { data, error } = await getAllAnalysis();

  return (
    <div className="space-y-3 relative">
      {data.length > 0 ? (
        <>
          <p className="px-2">Analysis</p>
          <ScrollArea className="h-40">
            {data.map((item, i) => (
              <div className="group" key={`analysis-${i}`}>
                {i !== 0 && <Separator />}
                <div className="flex justify-between items-center px-2 py-1 my-1 group-hover:bg-muted/50 rounded-md">
                  <p className="text-sm text-muted-foreground leading-loose line-clamp-1">
                    {item?.topic}
                  </p>
                  <DeleteButton id={item._id} />
                </div>
              </div>
            ))}
          </ScrollArea>
        </>
      ) : (
        <NoDataOrError error={error} defaultText="No analysis yet." />
      )}
    </div>
  );
};

export default AnalysisTitlesScrollable;
