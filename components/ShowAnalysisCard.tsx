import { getCurrentAnalysis } from "@/lib/actions/analysis.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import NoDataOrError from "./NoDataOrError";

const ShowAnalysisCard = async () => {
  const { data, error } = await getCurrentAnalysis();

  const formattedContent = data?.content
    ?.split("\n")
    .map((line: string, i: number) => (
      <p key={`line-${i}`}>
        {line}
        <br />
      </p>
    ));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Analysis</CardTitle>
        <CardDescription>{data?.topic}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 text-sm text-muted-foreground leading-normal">
          {!data ? (
            <NoDataOrError defaultText="No analysis yet" />
          ) : (
            formattedContent
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ShowAnalysisCard;
