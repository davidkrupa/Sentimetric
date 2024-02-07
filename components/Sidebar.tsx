"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiMenuFoldLine, RiMenuUnfoldLine, RiOpenaiFill } from "react-icons/ri";
import logo from "../lib/assets/logo-first.png";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const menuItems = [
    {
      title: "Research",
      list: [
        {
          title: "Summary",
          path: "/dashboard",
          icon: <RiOpenaiFill />,
        },
        {
          title: "Profile",
          path: "/dashboard/profile",
          icon: <RiOpenaiFill />,
        },
        {
          title: "Analysis",
          path: "/dashboard/analysis",
          icon: <RiOpenaiFill />,
        },
        {
          title: "Ideas",
          path: "/dashboard/ideas",
          icon: <RiOpenaiFill />,
        },
        {
          title: "Project",
          path: "/dashboard/project",
          icon: <RiOpenaiFill />,
        },
      ],
    },
    // {
    //   title: "Results",
    //   list: [
    //     {
    //       title: "Line",
    //       path: "/dashboard/line",
    //       icon: <RiOpenaiFill />,
    //     },
    //     {
    //       title: "Area",
    //       path: "/dashboard/area",
    //       icon: <RiOpenaiFill />,
    //     },
    //     {
    //       title: "Bar",
    //       path: "/dashboard/bar",
    //       icon: <RiOpenaiFill />,
    //     },
    //   ],
    // },
    // {
    //   title: "Creating Project",
    //   list: [
    //     {
    //       title: "Introduction",
    //       path: "/dashboard/introduction",
    //       icon: <RiOpenaiFill />,
    //     },
    //     {
    //       title: "Presentation",
    //       path: "/dashboard/presentation",
    //       icon: <RiOpenaiFill />,
    //     },
    //     {
    //       title: "Summary",
    //       path: "/dashboard/summary",
    //       icon: <RiOpenaiFill />,
    //     },
    //   ],
    // },
  ];

  const path = usePathname();

  return (
    <>
      {/* opened sidebar */}
      {isSidebarOpen && (
        <div className="w-60 h-screen pb-10 md:overflow-hidden overflow-auto md:hover:overflow-auto border-r border-r-border">
          <div className="flex justify-between items-center px-2 pt-3">
            <div className="flex justify-start items-center gap-3">
              <Image src={logo} alt="Sentimetric logo" width={25} height={25} />
              <span>Sentimetric</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)}>
              <RiMenuFoldLine />
            </button>
          </div>
          <div>
            {menuItems.map((item) => (
              <div key={item.title}>
                <p className="text-foreground m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.list.map((tool) => (
                  <div key={tool.title} className="flex">
                    <Link
                      href={tool.path}
                      className={`flex items-center justify-start gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-muted-foreground hover:text-foreground text-md m-2 w-full hover:bg-muted/50 transition-colors ${
                        tool.path === path && "bg-muted/50"
                      }`}
                    >
                      {tool.icon}
                      <span className="capitalize">{tool.title}</span>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* closed sidebar */}
      {!isSidebarOpen && (
        <button
          className="flex justify-center items-center fixed top-5 left-0 p-2 border-r border-t border-b border-input rounded-e-full"
          onClick={() => setIsSidebarOpen(true)}
        >
          <RiMenuUnfoldLine />
        </button>
      )}
    </>
  );
};

export default Sidebar;
