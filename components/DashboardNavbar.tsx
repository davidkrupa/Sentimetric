import { UserButton } from "@clerk/nextjs";

import { ThemeDropdown } from "./ThemeDropdown";
import ProfileDetails from "./ProfileDetails";
import { Suspense } from "react";
import SkeletonProfileDetails from "./SkeletonProfileDetails";
const DashboardNavbar = async () => {
  return (
    <div className="flex justify-between items-center px-4 pt-4">
      <Suspense fallback={<SkeletonProfileDetails />}>
        <ProfileDetails showCompany={true} showIndustry={true} />
      </Suspense>
      <div className="flex items-center ml-auto gap-4">
        <ThemeDropdown />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default DashboardNavbar;
