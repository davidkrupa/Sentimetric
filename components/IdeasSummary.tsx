import { getIdeas } from "@/lib/actions/ideas.actions";
import GetIdeasButton from "./GetIdeasButton";
import { getDoesProfileExist } from "@/lib/actions/profile.actions";
import { getDoesAnalysisExist } from "@/lib/actions/analysis.actions";
import { getGetDoSkillsExist } from "@/lib/actions/skills.actions";
import NoDataOrError from "./NoDataOrError";

const IdeasSummary = async () => {
  const [ideas, isProfile, isSkill, isAnalysis] = await Promise.all([
    getIdeas(),
    getDoesProfileExist(),
    getGetDoSkillsExist(),
    getDoesAnalysisExist(),
  ]);

  const isAllowed = isProfile && isSkill.data && isAnalysis;

  return (
    <div className="space-y-3 px-5 w-full">
      <h3 className="text-center text-2xl font-semibold leading-none tracking-tight p-3">
        Company Summary
      </h3>
      {!isAllowed && !ideas && (
        <p className="text-center">
          You first need to add:
          {!isProfile && <NoDataOrError error="You need to create profile." />}
          <NoDataOrError error={isSkill.error} />
          {!isAnalysis && (
            <NoDataOrError error="You need create analysis first." />
          )}
        </p>
      )}
      <p className="whitespace-pre-line">{ideas?.content}</p>
      <div className="flex justify-center">
        {ideas == null && <GetIdeasButton isDisabled={!isAllowed} />}
      </div>
    </div>
  );
};

export default IdeasSummary;
