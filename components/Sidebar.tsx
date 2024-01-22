"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiMenuFoldLine, RiMenuUnfoldLine, RiOpenaiFill } from "react-icons/ri";

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
          title: "Research",
          path: "/dashboard/research",
          icon: <RiOpenaiFill />,
        },
        {
          title: "Analysis",
          path: "/dashboard/analysis",
          icon: <RiOpenaiFill />,
        },
        {
          title: "Creating",
          path: "/dashboard/creating",
          icon: <RiOpenaiFill />,
        },
      ],
    },
    {
      title: "Results",
      list: [
        {
          title: "Line",
          path: "/dashboard/line",
          icon: <RiOpenaiFill />,
        },
        {
          title: "Area",
          path: "/dashboard/area",
          icon: <RiOpenaiFill />,
        },
        {
          title: "Bar",
          path: "/dashboard/bar",
          icon: <RiOpenaiFill />,
        },
      ],
    },
    {
      title: "Creating Project",
      list: [
        {
          title: "Introduction",
          path: "/dashboard/introduction",
          icon: <RiOpenaiFill />,
        },
        {
          title: "Presentation",
          path: "/dashboard/presentation",
          icon: <RiOpenaiFill />,
        },
        {
          title: "Summary",
          path: "/dashboard/summary",
          icon: <RiOpenaiFill />,
        },
      ],
    },
  ];

  return (
    <>
      {/* opened sidebar */}
      {isSidebarOpen && (
        <div className="w-72 h-screen pb-10 md:overflow-hidden overflow-auto md:hover:overflow-auto border-r border-r-border">
          <div className="flex justify-between items-center px-2 pt-3">
            <div className="flex">
              <Image
                src="../public/next.svg"
                alt="Sentimetric logo"
                width={40}
                height={40}
              />
              <span>Sentimetric</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)}>
              <RiMenuFoldLine />
            </button>
          </div>
          <div>
            {menuItems.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.list.map((tool) => (
                  <div key={tool.title} className="flex">
                    <Link
                      href={tool.path}
                      className="flex items-center justify-start gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 w-full hover:bg-slate-300 transition-all delay-75 ease-out"
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
