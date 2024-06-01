import { getIdeas } from "@/lib/actions/ideas.actions";
import { getCompanySummary } from "@/lib/actions/summary.actions";
import CreatingSummaryCard from "./CreatingSummaryCard";
import NoDataOrError from "./NoDataOrError";
import { ScrollArea } from "./ui/scroll-area";
import { formatText } from "@/lib/utils";

const SummaryCards = async () => {
  const ideas = await getIdeas();
  const summary = await getCompanySummary();

  const isAllowed = ideas.data && summary.data;
  const isError = ideas.error || summary.error;

  const ideasArray = formatText(ideas.data?.content);

  const mergedContent = ideasArray
    .map((item) => {
      return `${item.index + 1}. ${item.title} - ${item.explanation}`;
    })
    .join("\n\n");

  return (
    <div className="w-full">
      {isAllowed || isError ? (
        <>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm py-8 mb-4">
            <h2 className="text-center text-3xl mb-8">Company Summary</h2>
            <ScrollArea className="h-80 max-w-4xl mx-auto">
              <p className="whitespace-pre-line w-full mx-auto text-muted-foreground px-4 sm:px-6">
                {summary?.data ? (
                  summary?.data?.content
                ) : (
                  <NoDataOrError
                    error={summary.error}
                    defaultText="No summary yet"
                  />
                )}
              </p>
            </ScrollArea>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm py-8">
            <h2 className="text-center text-3xl mb-8">Project Ideas</h2>
            <ScrollArea className="h-80 max-w-4xl mx-auto">
              <p className="whitespace-pre-line w-full mx-auto text-muted-foreground px-4 sm:px-6">
                {ideas?.data ? (
                  mergedContent
                ) : (
                  <NoDataOrError
                    error={ideas.error}
                    defaultText="No ideas yet"
                  />
                )}
              </p>
            </ScrollArea>
          </div>
        </>
      ) : (
        <CreatingSummaryCard />
      )}
    </div>
  );
};

export default SummaryCards;
