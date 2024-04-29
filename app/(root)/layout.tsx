import DashboardNavbar from "@/components/DashboardNavbar";
import Sidebar from "@/components/Sidebar";
import ThemeProvider from "../../contexts/ThemeProvider";

import "./dashboard.css";
import { Toaster } from "@/components/ui/toaster";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex overflow-y-hidden bg-background">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-y-auto w-full">
          <DashboardNavbar />
          <main className="flex-1 p-4">
            {children}
            <Toaster />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default RootLayout;
