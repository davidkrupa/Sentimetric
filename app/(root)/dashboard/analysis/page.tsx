import { Suspense } from "react";

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

const Page = async () => {
  return (
    <main className="grid md:grid-cols-2 gap-6">
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

      <Suspense fallback={<Skeleton className="h-32" />}>
        <div className="overflow-x-hidden md:col-span-2">
          <AnalysisTable />
        </div>
      </Suspense>
    </main>
  );
};

export default Page;
