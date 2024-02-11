import { UserButton } from "@clerk/nextjs";

import { ThemeDropdown } from "./ThemeDropdown";
import ProfilePicker from "./ProfilePicker";
import {
  getAllProfiles,
  getCurrentProfileId,
} from "@/lib/actions/profile.actions";
const DashboardNavbar = async () => {
  const profiles = await getAllProfiles();
  const currentId = await getCurrentProfileId();

  return (
    <div className="flex justify-end items-center gap-4 py-2 pr-6">
      <ProfilePicker data={profiles} current={currentId} />
      <ThemeDropdown />
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default DashboardNavbar;
