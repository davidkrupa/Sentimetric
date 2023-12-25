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
          path: "/dashboard/summary",
          icon: <RiOpenaiFill />,
        },
        {
          title: "Research",
          path: "/dashboard/research",
          icon: <RiOpenaiFill />,
        },
        {
          title: "Analyze",
          path: "/dashboard/analyze",
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
    <div className="ml-3 my-5 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {isSidebarOpen && (
        <>
          <div className="flex justify-between items-center">
            <div className="flex">
              <Image
                src="../public/next.svg"
                alt="Sentimetric logo"
                width={40}
                height={40}
              />
              <span>Sentimetric</span>
            </div>
            {/* button to separate component */}
            <button onClick={() => setIsSidebarOpen(false)}>
              <RiMenuFoldLine />
            </button>
          </div>
          <div className="">
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
        </>
      )}
    </div>
  );
};

export default Sidebar;
