import { getActivitiesAmountByDay } from "@/lib/actions/activities.actions";
import ReChartsLineChart from "./ReChartsLineChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const LineChartCard = async () => {
  const data = await getActivitiesAmountByDay(7);

  const amount = data?.reduce((acc, curr) => acc + curr?.activities, 0);

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Last Week's Activities</CardTitle>
        <CardDescription>
          You had {amount || 0} activities in the last 7 days.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ReChartsLineChart data={data} />
      </CardContent>
    </Card>
  );
};

export default LineChartCard;
