import ReChartsLineChart from "./ReChartsLineChart";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// dummy data
const data = [
  {
    day: "MON",
    activities: 1,
  },
  {
    day: "TEU",
    activities: 5,
  },
  {
    day: "WED",
    activities: 4,
  },
  {
    day: "THU",
    activities: 3,
  },
  {
    day: "FRI",
    activities: 5,
  },
  {
    day: "SAT",
    activities: 0,
  },
  {
    day: "SUN",
    activities: 1,
  },
];

const LineChartCard = () => {
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
