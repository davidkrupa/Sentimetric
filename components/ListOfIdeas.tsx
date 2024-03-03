import { getIdeas } from "@/lib/actions/ideas.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const ListOfIdeas = async () => {
  const { content } = await getIdeas();

  if (!content) return;

  const regex = /\b\d+\.\s+(.*)/g;

  const points = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    points.push(match[1]);
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Choose Your Projects</CardTitle>
          <CardDescription>
            Remove or add to the list the projects that interest you most.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {points.map((point, i) => (
            <div key={`point-${i}}`}>
              <p>{`${i + 1}. ${point}`}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ListOfIdeas;
