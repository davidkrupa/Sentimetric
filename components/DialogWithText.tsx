import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

const DialogWithText = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="xs" variant="outline">
          Examples
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl grid gap-8">
        <DialogHeader>
          <DialogTitle>What content to analyze?</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-muted-foreground text-md leading-relaxed">
          <p>
            Analyze the areas of the company you have chosen that will allow you
            to collect data about it and its current situation.
          </p>
          <p>
            Some examples of where you can find useful content for analysis:
          </p>
          <ul className="list-disc ml-4">
            <li>Company website "About us"</li>
            <li>Job offers in your area of ​​interest</li>
            <li>Company news</li>
            <li>Customer reviews on Trustpilot</li>
          </ul>
          <p>
            Just copy and paste the page content and provide a short title for
            better analysis.
          </p>
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWithText;
