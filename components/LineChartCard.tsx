import { getActivitiesAmountByDay } from "@/lib/actions/activities.actions";
import ReChartsLineChart from "./ReChartsLineChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import NoDataOrError from "./NoDataOrError";

const LineChartCard = async () => {
  const { data, error } = await getActivitiesAmountByDay(7);

  const amount = data?.reduce((acc, curr) => acc + curr?.activities, 0) ?? null;

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Last Week's Activities</CardTitle>
        <CardDescription>
          {!data && (
            <NoDataOrError error={error} defaultText="No activities yet" />
          )}
          {amount && `You had ${amount} activities in the last 7 days.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        {data && <ReChartsLineChart data={data} />}
      </CardContent>
    </Card>
  );
};

export default LineChartCard;
