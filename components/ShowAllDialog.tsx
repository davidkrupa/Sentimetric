import { Button } from "@/components/ui/button";
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
import SkillsBadges from "./SkillsBadges";
import { SkillBadgesProps } from "@/types";

const ShowAllDialog: React.FC<SkillBadgesProps> = async ({
  skills,
  hasMore,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="xs">Show All</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl grid gap-8">
        <DialogHeader>
          <DialogTitle>Your skills</DialogTitle>
          <DialogDescription>
            All the skills you have in your current profile.
          </DialogDescription>
        </DialogHeader>
        <SkillsBadges skills={skills} hasMore={hasMore} />
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

export default ShowAllDialog;
