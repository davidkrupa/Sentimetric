import { getActivitiesAmountByDay } from "@/lib/actions/activities.actions";
import ReChartsLineChart from "./ReChartsLineChart";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const LineChartCard = async () => {
  const data = await getActivitiesAmountByDay(7);

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ReChartsLineChart data={data} />
      </CardContent>
    </Card>
  );
};

export default LineChartCard;
