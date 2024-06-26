"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { FaRegLightbulb } from "react-icons/fa";
import { FaChartBar, FaRegMessage, FaUser } from "react-icons/fa6";
import { BsPersonVcardFill } from "react-icons/bs";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { GrSearchAdvanced } from "react-icons/gr";

import logo from "../lib/assets/sentimetric-logo.webp";
import LoadingSpinner from "./ui/LoadingSpinner";

const menuItems = [
  {
    title: "Summary",
    path: "/dashboard",
    icon: <FaChartBar />,
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <BsPersonVcardFill />,
  },
  {
    title: "Analysis",
    path: "/dashboard/analysis",
    icon: <GrSearchAdvanced />,
  },
  {
    title: "Ideas",
    path: "/dashboard/ideas",
    icon: <FaRegLightbulb />,
  },
  {
    title: "Project",
    path: "/dashboard/project",
    icon: <HiOutlinePencilSquare />,
  },
];

type SidebarOptions = "default" | "closed" | "opened";

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [chosenPath, setChosenPath] = useState("");
  const [sidebarState, setSidebarState] = useState<SidebarOptions>("default");
  const [delayTimeout, setDelayTimeout] = useState<NodeJS.Timeout | null>(null);
  const path = usePathname();

  useEffect(() => {
    if (delayTimeout !== null) {
      clearTimeout(delayTimeout);
    }
    setIsLoading(false);
  }, [path]);

  const handleLinkClick = (clickedPath: string) => {
    if (chosenPath === clickedPath) return;

    setChosenPath(clickedPath);
    setSidebarState("default");

    // delay for preventing spinner blink for cached routes
    const timeout = setTimeout(() => {
      setIsLoading(true);
    }, 200);

    setDelayTimeout(timeout);
  };

  const sidebarStyle = {
    default: "hidden md:block",
    closed: "hidden",
    opened: "block",
  };

  return (
    <>
      {/* sidebar */}
      <aside
        className={`${sidebarStyle[sidebarState]} md:static fixed top-0 left-0 z-20 bg-card w-52 min-h-screen pb-10 md:overflow-hidden overflow-auto md:hover:overflow-auto border-r border-r-border`}
      >
        <div className="flex justify-between items-center p-4">
          <Link
            href="/dashboard"
            className="flex justify-start items-center gap-1"
          >
            <div className="flex justify-center items-center size-7">
              <Image src={logo} width={25} height={25} alt="Sentimetric logo" />
            </div>
            <span className="text-lg text-secondary-foreground font-semibold">
              Sentimetric
            </span>
          </Link>
          <button onClick={() => setSidebarState("closed")}>
            <RiMenuFoldLine />
          </button>
        </div>
        <div className="flex flex-col px-4 pt-4 gap-3">
          {menuItems.map((tool, i) => (
            <Link
              key={`tool-${i}`}
              href={tool.path}
              onClick={() => handleLinkClick(tool.path)}
              className={`flex items-center justify-start relative gap-5 py-3 px-2 rounded-lg text-muted-foreground hover:text-foreground text-md w-full hover:bg-muted/50 transition-colors ${
                tool.path === path && "bg-muted/50"
              }`}
            >
              {tool.icon}
              <span className="capitalize">{tool.title}</span>
              {isLoading && tool.path === chosenPath && (
                <LoadingSpinner className="mr-3 absolute right-0 top-0 bottom-0 my-auto" />
              )}
            </Link>
          ))}

          {/* feedback */}
          <div className="fixed bottom-3 w-44 space-y-3">
            <Link
              href="/dashboard/feedback"
              onClick={() => handleLinkClick("/dashboard/feedback")}
              className={`flex items-center justify-start relative gap-5 py-3 px-2 rounded-lg text-muted-foreground hover:text-foreground text-md w-full hover:bg-muted/50 transition-colors ${
                path === "/dashboard/feedback" && "bg-muted/50"
              }`}
            >
              <FaRegMessage />
              <span className="capitalize">Feedback</span>
              {isLoading && chosenPath === "/dashboard/feedback" && (
                <LoadingSpinner className="mr-3 absolute right-0 top-0 bottom-0 my-auto" />
              )}
            </Link>

            {/* User payment plan details */}
            {/* <Link
              href="/dashboard/plan"
              onClick={() => handleLinkClick("/dashboard/plan")}
              className={`flex items-center justify-start gap-5 py-3 px-2 rounded-lg text-muted-foreground hover:text-foreground text-md w-full hover:bg-muted/50 transition-colors ${
                path === "/dashboard/plan" && "bg-muted/50"
              }`}
            >
              <FaUser />
              <span className="capitalize">Your Plan</span>
              {isLoading && chosenPath === "/dashboard/plan" && (
                <LoadingSpinner className="mr-3 absolute right-0 top-0 bottom-0 my-auto" />
              )}
            </Link> */}
          </div>
        </div>
      </aside>

      {/* sidebar toggle button */}
      <button
        className="flex justify-center items-center fixed z-10 bottom-2 left-2 p-2 border-r border-t border-b border-input rounded-full bg-primary text-white"
        onClick={() => setSidebarState("opened")}
      >
        {!isLoading && <RiMenuUnfoldLine />}
        {isLoading && <LoadingSpinner className="text-white h-auto w-auto" />}
      </button>
    </>
  );
};

export default Sidebar;
