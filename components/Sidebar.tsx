"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { FaChartBar, FaRegLightbulb } from "react-icons/fa";
import { BsPersonVcardFill } from "react-icons/bs";
import { GrSearchAdvanced } from "react-icons/gr";
import { usePathname } from "next/navigation";

import logo from "../lib/assets/logo-first.png";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const menuItems = [
    {
      title: "Research",
      list: [
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
      ],
    },
  ];

  const path = usePathname();

  return (
    <>
      {/* opened sidebar */}
      {isSidebarOpen && (
        <aside className="w-52 min-h-screen pb-10 md:overflow-hidden overflow-auto md:hover:overflow-auto border-r border-r-border">
          <div className="flex justify-between items-center p-4">
            <div className="flex justify-start items-center gap-2">
              <Image src={logo} alt="Sentimetric logo" width={25} height={25} />
              <span>Sentimetric</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)}>
              <RiMenuFoldLine />
            </button>
          </div>
          <div className="flex flex-col px-4 pt-4">
            {menuItems.map((item) => (
              <div key={item.title}>
                {/* grouping sidebar routes for the future */}
                {/* <p className="text-muted-foreground text-sm uppercase">
                  {item.title}
                </p> */}
                <div className="flex flex-col gap-3">
                  {item.list.map((tool) => (
                    <Link
                      key={tool.title}
                      href={tool.path}
                      className={`flex items-center justify-start gap-5 py-3 px-2 rounded-lg text-muted-foreground hover:text-foreground text-md w-full hover:bg-muted/50 transition-colors ${
                        tool.path === path && "bg-muted/50"
                      }`}
                    >
                      {tool.icon}
                      <span className="capitalize">{tool.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* closed sidebar */}
      {!isSidebarOpen && (
        <button
          className="flex justify-center items-center fixed z-10 bottom-2 left-2 p-2 border-r border-t border-b border-input rounded-full bg-primary text-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <RiMenuUnfoldLine />
        </button>
      )}
    </>
  );
};

export default Sidebar;
