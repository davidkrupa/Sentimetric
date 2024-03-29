"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";
import { FaChartBar, FaRegLightbulb } from "react-icons/fa";
import { BsPersonVcardFill } from "react-icons/bs";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { GrSearchAdvanced } from "react-icons/gr";
import { ImSpinner2 } from "react-icons/im";

import logo from "../lib/assets/logo-first.png";

const MIN_WIDTH = 768;

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

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chosenPath, setChosenPath] = useState("");
  const path = usePathname();

  useEffect(() => {
    if (window.innerWidth >= MIN_WIDTH) {
      setIsOpen(true);
    } else {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [path]);

  const handleLinkClick = (clickedPath: string) => {
    if (chosenPath === clickedPath) return;

    setIsLoading(true);
    setChosenPath(clickedPath);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* opened sidebar */}
      {isOpen && (
        <aside className="md:static fixed top-0 left-0 z-20 bg-card w-52 min-h-screen pb-10 md:overflow-hidden overflow-auto md:hover:overflow-auto border-r border-r-border">
          <div className="flex justify-between items-center p-4">
            <div className="flex justify-start items-center gap-2">
              <Image src={logo} alt="Sentimetric logo" width={25} height={25} />
              <span>Sentimetric</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
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
                      onClick={() => handleLinkClick(tool.path)}
                      className={`flex items-center justify-start relative gap-5 py-3 px-2 rounded-lg text-muted-foreground hover:text-foreground text-md w-full hover:bg-muted/50 transition-colors ${
                        tool.path === path && "bg-muted/50"
                      }`}
                    >
                      {tool.icon}
                      <span className="capitalize">{tool.title}</span>
                      {isLoading && tool.path === chosenPath && (
                        <ImSpinner2 className="animate-spin-slow h-5 w-5 mr-3 text-primary absolute right-0 top-0 bottom-0 my-auto" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}

      {/* closed sidebar */}
      {!isOpen && isMobile && (
        <button
          className="flex justify-center items-center fixed z-10 bottom-2 left-2 p-2 border-r border-t border-b border-input rounded-full bg-primary text-white"
          onClick={() => setIsOpen(true)}
        >
          {!isLoading && <RiMenuUnfoldLine />}
          {isLoading && <ImSpinner2 className="animate-spin-slow text-white" />}
        </button>
      )}
    </>
  );
};

export default Sidebar;
