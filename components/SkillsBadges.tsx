import { SkillBadgesProps } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

const SkillsBadges: React.FC<SkillBadgesProps> = async ({
  skills,
  hasMore,
}) => {
  return (
    <div>
      {skills.map((skill, i) => (
        <>
          <Badge
            key={`skill-${i}`}
            variant="outline"
            className="relative group mr-2 mb-2 px-3 py-1 capitalize font-medium text-muted-foreground hover:text-transparent"
          >
            {skill}
            <button className="absolute right-0 top-0 h-full w-full rounded-lg bg-muted/50 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              X
            </button>
          </Badge>
        </>
      ))}
      {/* make separate component - button need to be a client component to show dialog */}
      {hasMore && <Button size="xs">Show All</Button>}
    </div>
  );
};

export default SkillsBadges;
