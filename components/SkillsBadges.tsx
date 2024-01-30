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
            className="relative group mr-2 mb-2 px-3 py-1 capitalize font-medium text-muted-foreground hover:text-transparent"
          >
            {skill}
            <button className="absolute right-0 top-0 h-full w-full rounded-lg bg-muted/50 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              X
            </button>
          </Badge>
        </>
      ))}
    </div>
  );
};

export default SkillsBadges;
