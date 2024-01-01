import { UserButton } from "@clerk/nextjs";
import { ThemeDropdown } from "./ThemeDropdown";

const DashboardNavbar = () => {
  return (
    <div className="flex justify-end items-center gap-4 py-2 pr-6">
      <ThemeDropdown />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default DashboardNavbar;
