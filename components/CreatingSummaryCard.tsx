import { getDoesAnalysisExist } from "@/lib/actions/analysis.actions";
import { getDoesProfileExist } from "@/lib/actions/profile.actions";
import { getGetDoSkillsExist } from "@/lib/actions/skills.actions";
import NoDataOrError from "./NoDataOrError";
import GenerateCompanySummaryButton from "./GenerateCompanySummaryButton";

const CreatingSummaryCard = async () => {
  const [profile, skills, analysis] = await Promise.all([
    getDoesProfileExist(),
    getGetDoSkillsExist(),
    getDoesAnalysisExist(),
  ]);

  const isAllowed = profile.data && skills.data && analysis.data;

  return (
    <div className="space-y-3 px-5 w-full rounded-lg border bg-card text-card-foreground shadow-sm py-16">
      <h3 className="text-center text-2xl font-semibold leading-none tracking-tight p-3">
        Company Summary
      </h3>
      {/* Error messages */}
      <div className="text-center">
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
      </div>

      <div className="flex justify-center">
        <GenerateCompanySummaryButton isDisabled={!isAllowed} />
      </div>
    </div>
  );
};

export default CreatingSummaryCard;
