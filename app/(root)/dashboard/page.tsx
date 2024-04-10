import { IoDocumentTextOutline, IoNotificationsOutline } from "react-icons/io5";
import { FaRegLightbulb, FaChartBar } from "react-icons/fa";

import LastActivitiesCard from "@/components/LastActivitiesCard";
import LineChartCard from "@/components/LineChartCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import StatisticsCards from "@/components/StatisticsCards";

const Page = async () => {
  return (
    <div className="space-y-4">
      <StatisticsCards />
      <div className="grid gap-4 lg:grid-cols-7">
        <Suspense
          fallback={<Skeleton className="min-h-60 lg:col-span-4 rounded-md" />}
        >
          <LineChartCard />
        </Suspense>
        <Suspense
          fallback={<Skeleton className="min-h-60 lg:col-span-3 rounded-md" />}
        >
          <LastActivitiesCard />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
