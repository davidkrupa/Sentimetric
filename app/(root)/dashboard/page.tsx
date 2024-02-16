import { IoDocumentTextOutline, IoNotificationsOutline } from "react-icons/io5";
import { FaRegLightbulb, FaChartBar } from "react-icons/fa";

import LastActivitiesCard from "@/components/LastActivitiesCard";
import LineChartCard from "@/components/LineChartCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Page = async () => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Added</CardTitle>
            <FaRegLightbulb className="text-foreground text-lg" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+34</div>
            <p className="text-xs text-muted-foreground">+20% last 7 weeks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Analyzes created
            </CardTitle>
            <FaChartBar className="text-foreground text-lg" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+18</div>
            <p className="text-xs text-muted-foreground">+7% last 7 weeks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Project proposals
            </CardTitle>
            <IoDocumentTextOutline className="text-foreground text-lg" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+11</div>
            <p className="text-xs text-muted-foreground">+15% last 7 weeks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Activities last 30 days
            </CardTitle>
            <IoNotificationsOutline className="text-foreground text-lg" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+73</div>
            <p className="text-xs text-muted-foreground">+35% last 7 weeks</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-7">
        <LineChartCard />
        <LastActivitiesCard />
      </div>
    </div>
  );
};

export default Page;
