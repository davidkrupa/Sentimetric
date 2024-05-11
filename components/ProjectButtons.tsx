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

export default async function ProjectButtons() {
  const sectionPromises = [
    getProjectSection("introduction"),
    getProjectSection("projectIdea", 0),
    getProjectSection("projectIdea", 1),
    getProjectSection("projectIdea", 2),
    getProjectSection("about"),
    getProjectSection("conclusion"),
  ];

  const [introduction, ideaOne, ideaTwo, ideaThree, about, conclusion] =
    await Promise.all(sectionPromises);

  const isGenerateButtonAllowed =
    !introduction.data || !about.data || !conclusion.data;

  const isDialogAllowed =
    introduction.data ||
    about.data ||
    conclusion.data ||
    ideaOne.data ||
    ideaTwo.data ||
    ideaThree.data;

  const sections = [
    introduction,
    ideaOne,
    ideaTwo,
    ideaThree,
    about,
    conclusion,
  ];

  const contentForCopy = sections
    .map((section) => {
      return `${section.data?.topic || "This section has no topic yet."}\n${section.data?.content || "This section has no content yet."}\n\n`;
    })
    .join("\n");

  return (
    <div>
      {isGenerateButtonAllowed && <GenerateContentButton />}
      {isDialogAllowed && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">See The Project</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl grid gap-8">
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

            <DialogFooter className="sm:justify-start">
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
