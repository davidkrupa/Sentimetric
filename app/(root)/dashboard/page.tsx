import { ShadcnInputForm } from "@/components/ShadcnInputForm";
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
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* <ShadcnInputForm /> */}

      <Card>
        <CardHeader>
          <CardTitle>Analyze Job Skills</CardTitle>
          <CardDescription>
            Get a list of skills employers are looking for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ShadcnInputForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills Chart</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
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
