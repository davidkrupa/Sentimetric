import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Skeleton className="h-96" />
      <Skeleton className="h-96" />
      <Skeleton className="col-span-2 h-40" />
    </div>
  );
};

export default Loading;
