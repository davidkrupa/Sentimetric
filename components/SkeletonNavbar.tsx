import { Skeleton } from "./ui/skeleton";

const SkeletonNavbar = () => {
  return (
    <div className="flex justify-between items-center pt-4 px-4">
      <Skeleton className="h-10 flex-1 max-w-[500px]" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-sm" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
};

export default SkeletonNavbar;
