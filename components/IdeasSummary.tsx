import { getIdeas } from "@/lib/actions/ideas.actions";
import GetIdeasButton from "./GetIdeasButton";

const IdeasSummary = async () => {
  const { content } = await getIdeas();

  return (
    <div className="space-y-3 px-5">
      <h3 className="text-center text-2xl font-semibold leading-none tracking-tight p-3">
        Company Summary
      </h3>
      <p className="whitespace-pre-line">{content && content}</p>
      <GetIdeasButton />
    </div>
  );
};

export default IdeasSummary;
