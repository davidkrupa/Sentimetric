import { Skeleton } from "./ui/skeleton";

const SkeletonNavbar = () => {
  return (
    <div className="flex justify-end items-center gap-4 py-2 pr-6">
      <Skeleton className="h-10 w-36 rounded-sm" />
      <Skeleton className="h-10 w-10 rounded-sm" />
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  );
};

export default SkeletonNavbar;
