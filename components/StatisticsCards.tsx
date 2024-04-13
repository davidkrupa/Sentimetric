import { getActivitiesAmountByName } from "@/lib/actions/activities.actions";
import { FaChartBar, FaRegLightbulb } from "react-icons/fa";
import { IoDocumentTextOutline, IoNotificationsOutline } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const StatisticsCards = async () => {
  const options = [
    {
      name: "skill",
      title: "Skills",
      icon: <FaRegLightbulb className="text-foreground text-lg" />,
    },
    {
      name: "profile",
      title: "Profiles",
      icon: <IoDocumentTextOutline className="text-foreground text-lg" />,
    },
    {
      name: "analysis",
      title: "Analyzes",
      icon: <FaChartBar className="text-foreground text-lg" />,
    },
    {
      name: "idea",
      title: "Ideas",
      icon: <FaRegLightbulb className="text-foreground text-lg" />,
    },
  ];

  const activitiesAmounts = await getActivitiesAmountByName();

  const activities = options.map((option) => {
    const addedAmount = activitiesAmounts.find(
      (activity) =>
        activity._id.name === option.name && activity._id.action === "added"
    );
    const removedAmount = activitiesAmounts.find(
      (activity) =>
        activity._id.name === option.name && activity._id.action === "removed"
    );
    return {
      ...option,
      actions: {
        added: addedAmount?.total || 0,
        removed: removedAmount?.total || 0,
      },
    };
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {activities.map((activity) => (
        <Card key={activity.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {activity.title}
            </CardTitle>
            {activity.icon}
          </CardHeader>
          <CardContent className="flex gap-3 pt-2">
            <div className="text-center">
              <p className="text-2xl font-bold">{activity.actions.added}</p>
              <CardDescription>Added</CardDescription>
            </div>
            <span className="text-2xl font-bold">/</span>
            <div className="text-center">
              <p className="text-2xl font-bold">{activity.actions.removed}</p>
              <CardDescription>Removed</CardDescription>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsCards;
