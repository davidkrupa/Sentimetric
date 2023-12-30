import DashboardNavbar from "@/components/DashboardNavbar";
import Sidebar from "@/components/Sidebar";

const page = () => {
  const activeMenu = true;
  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
        <Sidebar />
      </div>
      <div className="w-full">
        <DashboardNavbar />
      </div>
    </div>
  );
};

export default page;
