import { FaMinus, FaPlus, FaRegLightbulb } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

// dummy data
const data = [
  {
    type: "skill",
    action: "added",
    amount: 3,
    date: "15 Feb 2024",
  },
  {
    type: "skill",
    action: "removed",
    amount: 1,
    date: "14 Feb 2024",
  },
  {
    type: "profile",
    action: "added",
    amount: 1,
    date: "12 Feb 2024",
  },
  {
    type: "analysis",
    action: "added",
    amount: 2,
    date: "11 Feb 2024",
  },
];

type LastActivitiesCardElement = {
  type: string;
  action: string;
  amount: number;
  date: string;
};
type LastActivitiesCardProps = {
  data: LastActivitiesCardElement[];
};

const LastActivitiesCard = () => {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>
          You had 23 activities in the last 7 days.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 lg:grid-cols-1 gap-3">
        {data?.map((activity, i) => (
          <div
            key={`activity-${i}`}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-5">
              <div className="relative flex justify-center items-center h-10 w-10">
                <FaRegLightbulb className="text-xl" />
                {activity.action === "removed" && (
                  <FaMinus className="text-sm text-destructive absolute top-0 right-0" />
                )}
                {activity.action === "added" && (
                  <FaPlus className="text-sm text-green-700 absolute top-0 right-0" />
                )}
              </div>
              <div>
                <p className="text-md text-muted-foreground tracking-wide">{`${activity?.amount} ${activity?.type} ${activity?.action}`}</p>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">{activity?.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LastActivitiesCard;
