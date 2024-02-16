import { Skeleton } from "./ui/skeleton";

const SkeletonProfileDetails = () => {
  return (
    <div className="flex flex-1 gap-8 xl:gap-12 max-w-[500px]">
      <Skeleton className="h-9 w-48 rounded-md" />
      <Skeleton className="h-9 flex-1 rounded-md hidden md:block " />
    </div>
  );
};

export default SkeletonProfileDetails;
