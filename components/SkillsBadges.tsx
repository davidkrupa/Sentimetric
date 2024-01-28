import { SkillBadgesProps } from "@/types";
import { Badge } from "@/components/ui/badge";

const SkillsBadges: React.FC<SkillBadgesProps> = async ({ skills }) => {
  return (
    <div className="line-clamp-2">
      {skills.map((skill, i) => (
        <>
          <Badge
            key={`skill-${i}`}
            variant="outline"
            className="mr-2 mb-2 px-3 py-1 capitalize font-medium text-muted-foreground relative group"
          >
            {skill}
            <button className="absolute invisible group-hover:visible right-0 top-0 h-full w-full rounded-lg bg-secondary text-primary">
              X
            </button>
          </Badge>
        </>
      ))}
    </div>
  );
};

export default SkillsBadges;
