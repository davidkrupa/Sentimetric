import { UserButton } from "@clerk/nextjs";

import { ThemeDropdown } from "./ThemeDropdown";
import ProfileDetails from "./ProfileDetails";
const DashboardNavbar = async () => {
  return (
    <div className="flex justify-between items-center px-4 pt-4">
      <ProfileDetails showCompany={true} showIndustry={true} />
      <div className="flex items-center ml-auto gap-4">
        <ThemeDropdown />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default DashboardNavbar;
