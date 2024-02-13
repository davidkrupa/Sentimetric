import { UserButton } from "@clerk/nextjs";

import { ThemeDropdown } from "./ThemeDropdown";
import ProfileSelectMenu from "./ProfileSelectMenu";
const DashboardNavbar = async () => {
  return (
    <div className="flex justify-end items-center gap-4 py-2 pr-6">
      <ProfileSelectMenu />
      <ThemeDropdown />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default DashboardNavbar;
