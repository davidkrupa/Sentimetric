import { getIdeas } from "@/lib/actions/ideas.actions";
import GetIdeasButton from "./GetIdeasButton";
import { getDoesProfileExist } from "@/lib/actions/profile.actions";
import { getDoesAnalysisExist } from "@/lib/actions/analysis.actions";
import { getGetDoSkillsExist } from "@/lib/actions/skills.actions";
import NoDataOrError from "./NoDataOrError";

const IdeasSummary = async () => {
  const [ideas, profile, skills, analysis] = await Promise.all([
    getIdeas(),
    getDoesProfileExist(),
    getGetDoSkillsExist(),
    getDoesAnalysisExist(),
  ]);

  const isAllowed = profile.data && skills.data && analysis.data;

  return (
    <div className="space-y-3 px-5 w-full">
      <h3 className="text-center text-2xl font-semibold leading-none tracking-tight p-3">
        Company Summary
      </h3>
      {!isAllowed && !ideas.data && (
        <p className="text-center">
          {!profile.data && (
            <NoDataOrError
              error={profile.error}
              defaultText="You need to create a profile."
            />
          )}
          {!skills.data && (
            <NoDataOrError defaultText="You need to add skills." />
          )}
          {!analysis.data && (
            <NoDataOrError
              error={analysis.error}
              defaultText="You need to create an analysis."
            />
          )}
        </p>
      )}
      <p className="whitespace-pre-line">{ideas.data?.content}</p>
      <div className="flex justify-center">
        {ideas.data == null && <GetIdeasButton isDisabled={!isAllowed} />}
      </div>
    </div>
  );
};

export default IdeasSummary;
