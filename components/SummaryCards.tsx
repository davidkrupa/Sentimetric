import { getIdeas } from "@/lib/actions/ideas.actions";
import { getCompanySummary } from "@/lib/actions/summary.actions";
import CreatingSummaryCard from "./CreatingSummaryCard";
import NoDataOrError from "./NoDataOrError";

const SummaryCards = async () => {
  const ideas = await getIdeas();
  const summary = await getCompanySummary();

  const isAllowed = ideas.data && summary.data;
  const isError = ideas.error || summary.error;

  return (
    <div className="px-5 w-full">
      {isAllowed || isError ? (
        <>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm py-8">
            <h2 className="text-center text-2xl mb-6">Company Summary</h2>
            <p className="whitespace-pre-line max-w-4xl mx-auto text-muted-foreground">
              {summary?.data ? (
                summary?.data?.content
              ) : (
                <NoDataOrError
                  error={summary.error}
                  defaultText="No summary yet"
                />
              )}
            </p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm py-8">
            <h2 className="text-center text-2xl mb-6">Project Ideas</h2>
            <p className="whitespace-pre-line max-w-4xl mx-auto text-muted-foreground">
              {ideas?.data ? (
                ideas?.data?.content
              ) : (
                <NoDataOrError error={ideas.error} defaultText="No ideas yet" />
              )}
            </p>
          </div>
        </>
      ) : (
        <CreatingSummaryCard />
      )}
    </div>
  );
};

export default SummaryCards;
