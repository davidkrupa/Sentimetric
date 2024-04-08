import { FaMinus, FaPlus, FaRegLightbulb } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { getLastActivities } from "@/lib/actions/activities.actions";

const LastActivitiesCard = async () => {
  const activities = await getLastActivities();

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>
          You had 23 activities in the last 7 days.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 lg:grid-cols-1 gap-3">
        {activities?.map((activity, i) => (
          <div
            key={`activity-${i}`}
            className="flex items-center justify-between gap-4 px-2"
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
                <p className="text-md text-muted-foreground tracking-wide">{`${activity?.total} ${activity?.name} ${activity?.action}`}</p>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">{activity?.createdAt}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LastActivitiesCard;
