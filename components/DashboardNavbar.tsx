import { UserButton } from "@clerk/nextjs";

const DashboardNavbar = () => {
  return (
    <div className="flex justify-end items-end bg-red-500 w-full py-2 pr-3">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default DashboardNavbar;
