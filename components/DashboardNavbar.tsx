import { UserButton } from "@clerk/nextjs";

const DashboardNavbar = () => {
  return (
    <div className="flex justify-end items-center py-2 pr-4 z-10">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default DashboardNavbar;
