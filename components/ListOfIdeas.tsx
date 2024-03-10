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
    <div>
      <Card>
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
              <p>{`${i + 1}. ${project.name}`}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ListOfIdeas;
