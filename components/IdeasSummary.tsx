import { getIdeas } from "@/lib/actions/ideas.actions";
import GetIdeasButton from "./GetIdeasButton";

const IdeasSummary = async () => {
  const ideas = await getIdeas();

  return (
    <div className="space-y-3 px-5 w-full">
      <h3 className="text-center text-2xl font-semibold leading-none tracking-tight p-3">
        Company Summary
      </h3>
      <p className="whitespace-pre-line">{ideas?.content}</p>
      <div className="flex justify-center">
        {ideas == null && <GetIdeasButton />}
      </div>
    </div>
  );
};

export default IdeasSummary;
