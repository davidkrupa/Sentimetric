import AnalysisTable from "@/components/AnalysisTable";
import DialogWithText from "@/components/DialogWithText";
import { ShadcnCustomAnalysisForm } from "@/components/ShadcnCustomAnalysisForm";
import ShowAnalysisCard from "@/components/ShowAnalysisCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

const Page = async () => {
  return (
    <main className="grid gap-6">
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Custom Analysis</CardTitle>
            <CardDescription className="flex items-start gap-4">
              Analyze the company's goals, problems and opportunities.
              <DialogWithText />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ShadcnCustomAnalysisForm />
          </CardContent>
        </Card>

        <Suspense fallback={<Skeleton />}>
          <ShowAnalysisCard />
        </Suspense>
      </div>

      <Suspense fallback={<Skeleton className="h-32" />}>
        <AnalysisTable />
      </Suspense>
    </main>
  );
};

export default Page;
