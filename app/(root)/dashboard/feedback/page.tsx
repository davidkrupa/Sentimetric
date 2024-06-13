import { ShadcnReviewForm } from "@/components/ShadcnReviewForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = async () => {
  return (
    <div className="mx-auto max-w-screen-md mt-8">
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Leave a Review</CardTitle>
          <CardDescription>
            We would love to hear your feedback!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ShadcnReviewForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
