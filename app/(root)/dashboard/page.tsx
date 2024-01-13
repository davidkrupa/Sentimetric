import { ShadcnJobDataForm } from "@/components/ShadcnJobDataForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const page = () => {
  const tabsList = [{ name: "Hard Skills" }, { name: "Soft Skills" }];
  return (
    <div className="grid grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Target Job Data</CardTitle>
          <CardDescription>
            Enter basic data to get a personalized analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ShadcnJobDataForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Skills</CardTitle>
          <CardDescription>
            Enter your skills related to the new job position.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Skills List</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Hard Skills</p>
          <Badge variant="outline" className="px-3 py-1 relative group">
            Leadership
            <button className="hidden group-hover:block text-white absolute top-0 right-0 bg-destructive pr-3 pl-2 py-1 rounded-r-full transition ease-out">
              X
            </button>
          </Badge>
          <Badge variant="outline">Communication</Badge>
        </CardContent>
        <CardFooter>
          <p>Soft Skills</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
