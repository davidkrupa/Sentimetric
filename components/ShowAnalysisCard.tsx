import { getCurrentAnalysis } from "@/lib/actions/analysis.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

const ShowAnalysisCard = async () => {
  const currentAnalysis = await getCurrentAnalysis();

  const formattedContent = currentAnalysis?.content
    .split("\n")
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
        <CardDescription>{currentAnalysis?.topic}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 text-sm text-muted-foreground leading-normal">
          {formattedContent || "No analysis yet"}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ShowAnalysisCard;
