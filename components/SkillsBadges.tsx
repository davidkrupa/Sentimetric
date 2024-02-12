import { SkillBadgesProps } from "@/types";
import { Badge } from "@/components/ui/badge";
import DeleteBadgeButton from "./DeleteBadgeButton";

const SkillsBadges: React.FC<SkillBadgesProps> = async ({
  skills,
  type,
  hasMore,
  children,
}) => {
  return (
    <div>
      {skills.map((skill, i) => (
        <Badge
          key={`skill-${i}`}
          variant="outline"
          className="relative group mr-2 mb-2 px-3 py-1 capitalize font-medium text-muted-foreground hover:text-transparent"
        >
          {skill}
          <DeleteBadgeButton skill={skill} type={type} />
        </Badge>
      ))}

      {hasMore && children}
    </div>
  );
};

export default SkillsBadges;
