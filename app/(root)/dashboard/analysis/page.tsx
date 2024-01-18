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

const page = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Custom Analysis</CardTitle>
          <CardDescription>
            Analyze areas that will allow to collect data on the company's goals
            (job offer, about us page, news).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ShadcnCustomAnalysisForm />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Your Current Analysis</CardTitle>
          <CardDescription>Topic from previous form</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-72">Content of the analysis.</ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
