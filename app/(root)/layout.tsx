import DashboardNavbar from "@/components/DashboardNavbar";
import Sidebar from "@/components/Sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  // move to context or to Sidebar
  const isHidden = false;

  return (
    <div
      className={`flex h-screen overflow-y-hidden bg-background ${
        isHidden ? "overflow-x-hidden" : ""
      }`}
    >
      {!isHidden && <Sidebar />}
      <div
        className={`flex flex-col flex-1 overflow-y-auto w-full ${
          isHidden ? "pl-0" : ""
        }`}
      >
        <DashboardNavbar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default RootLayout;
