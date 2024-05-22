import { getProjectSection } from "@/lib/actions/project.actions";
import GenerateContentButton from "./GenerateContentButton";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import CopyButton from "./CopyButton";
import { getDoesProfileExist } from "@/lib/actions/profile.actions";
import { getGetDoSkillsExist } from "@/lib/actions/skills.actions";
import { getDoesAnalysisExist } from "@/lib/actions/analysis.actions";
import NoDataOrError from "./NoDataOrError";
import { getDoIdeasExist } from "@/lib/actions/ideas.actions";
import { getDoesSummaryExist } from "@/lib/actions/summary.actions";

export default async function ProjectButtons() {
  const sectionPromises = [
    getProjectSection("introduction"),
    getProjectSection("projectIdea", 0),
    getProjectSection("projectIdea", 1),
    getProjectSection("projectIdea", 2),
    getProjectSection("conclusion"),
  ];

  const [introduction, ideaOne, ideaTwo, ideaThree, conclusion] =
    await Promise.all(sectionPromises);

  const [profile, skills, analysis, ideas, summary] = await Promise.all([
    getDoesProfileExist(),
    getGetDoSkillsExist(),
    getDoesAnalysisExist(),
    getDoIdeasExist(),
    getDoesSummaryExist(),
  ]);

  // when static section data is present generate button should not be shown
  // generete buttons for dynamic sections will be added in their sections
  const isGenerateButtonAllowed = !introduction.data && !conclusion.data;

  // when user didn't do previous steps, generate button should not be shown
  const isDisabled =
    !profile.data ||
    !skills.data ||
    !analysis.data ||
    !ideas.data ||
    !summary.data;

  const isDialogAllowed =
    introduction.data ||
    conclusion.data ||
    ideaOne.data ||
    ideaTwo.data ||
    ideaThree.data;

  const sections = [introduction, ideaOne, ideaTwo, ideaThree, conclusion];

  const contentForCopy = sections
    .map((section) => {
      return `${section.data?.topic || "This section has no topic yet."}\n${section.data?.content || "This section has no content yet."}\n\n`;
    })
    .join("\n");

  return (
    <div>
      {isGenerateButtonAllowed && (
        <div className="text-center">
          <GenerateContentButton isDisabled={isDisabled} />
          <div className="text-center mt-3">
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
            {!ideas.data && (
              <NoDataOrError
                error={ideas.error}
                defaultText="You need to create ideas."
              />
            )}
            {!summary.data && (
              <NoDataOrError
                error={summary.error}
                defaultText="You need to create a summary."
              />
            )}
          </div>
        </div>
      )}

      {/* dialog */}
      {isDialogAllowed && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">See The Project</Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl grid gap-8">
            <DialogHeader>
              <DialogTitle className="text-center">Your Project</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-96 text-muted-foreground leading-relaxed">
              {sections.map((section, i) => (
                <div key={`section-${i}`} className="mb-8 whitespace-pre-line">
                  <h2 className="pr-6 mb-4 text-lg text-foreground">
                    {section.data?.topic}
                  </h2>
                  <p className="pr-6">
                    {section.data?.content || "No content for this section"}
                  </p>
                </div>
              ))}
            </ScrollArea>

            <DialogFooter className="sm:justify-start gap-3">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <CopyButton content={contentForCopy} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
