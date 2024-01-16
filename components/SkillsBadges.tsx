import { SkillBadgesProps } from "@/types";
import { Badge } from "@/components/ui/badge";

const SkillsBadges: React.FC<SkillBadgesProps> = async ({ skills }) => {
  return (
    <div>
      {skills.map((skill, i) => (
        <Badge
          key={`skill-${i}`}
          variant="secondary"
          className="mr-2 mb-2 capitalize"
        >
          {skill}
        </Badge>
      ))}
    </div>
  );
};

export default SkillsBadges;
