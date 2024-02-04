import { DataTable } from "@/components/DataTable";
import { ShadcnCustomAnalysisForm } from "@/components/ShadcnCustomAnalysisForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getAllAnalysis,
  getCurrentAnalysis,
} from "@/lib/actions/analysis.actions";
import { columns } from "@/lib/tables/columns";

const Page = async () => {
  const data = await getAllAnalysis();
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
    <main className="grid gap-6">
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Custom Analysis</CardTitle>
            <CardDescription>
              Analyze areas that will allow to collect data on the company's
              goals (job offer, about us page, news).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ShadcnCustomAnalysisForm />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Analysis</CardTitle>
            <CardDescription>{currentAnalysis?.topic}</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-72 text-sm text-muted-foreground leading-normal">
              {formattedContent}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <DataTable
        columns={columns}
        data={data}
        currentId={currentAnalysis?._id}
      />
    </main>
  );
};

export default Page;
