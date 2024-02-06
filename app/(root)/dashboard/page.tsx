import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRegLightbulb, FaChartBar } from "react-icons/fa";
import { IoDocumentTextOutline, IoNotificationsOutline } from "react-icons/io5";

const Page = () => {
  return (
    <main className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skills Added</CardTitle>
            <FaRegLightbulb className="text-white text-lg" />
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
            <FaChartBar className="text-white text-lg" />
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
            <IoDocumentTextOutline className="text-white text-lg" />
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
            <IoNotificationsOutline className="text-white text-lg" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+73</div>
            <p className="text-xs text-muted-foreground">+35% last 7 weeks</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">Analysis chart here</CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              You had 23 activities in the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent>Analysis coponent here</CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Page;
