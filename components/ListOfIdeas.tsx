import { getProjects } from "@/lib/actions/project.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const ListOfIdeas = async () => {
  const projects = await getProjects();

  if (!projects) return;

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Choose Your Projects</CardTitle>
        <CardDescription>
          The list below was generated from the content above. Delete, edit or
          add new projects to the list.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {projects.map((project, i) => (
          <div key={`point-${i}}`}>
            <p className="text-muted-foreground">{`${i + 1}. ${project.name}`}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ListOfIdeas;
