import Link from "next/link";
import Header from "./Header";
import { Button } from "./ui/button";
import Image from "next/image";

import dashboard from "@/lib/assets/screenshot-2.webp";
import { BorderBeam } from "./magicui/border-beam";

const Hero = () => {
  return (
    <div className="relative w-full">
      <Header />

      {/* Hero Content */}
      <div className="relative h-screen flex items-center justify-center px-3 sm:px-6">
        <div className="text-center max-w-[750px]">
          <h1 className="text-4xl sm:text-6xl font-semibold text-slate-100 mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text font-extrabold text-transparent">
              Make Recruiters Want To Hire You
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-100 mb-8">
            {`Create a personalized text presentation in less than half an hour using our AI tools - guaranteed to be a magnet for recruiters.`}
          </p>
          <Button
            asChild
            // variant="outline"
            // className="bg-transparent hover:bg-primary text-slate-100 hover:text-slate-100  border border-slate-100 hover:border-primary"
          >
            <Link href="#pricing">Start Your Project</Link>
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative -mt-32 lg:-mt-24 pb-20 px-3 sm:px-6">
        <div className="relative rounded-xl max-w-screen-lg mx-auto">
          {/* OPTION 1: Simple blue glow */}
          {/* <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-3xl -z-10 scale-105"></div> */}

          {/* OPTION 2: Gradient glow */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-blue-500/30 rounded-xl blur-2xl -z-10 scale-110"></div> */}

          {/* OPTION 3: Multiple layered glow */}
          <div className="absolute inset-0 bg-blue-700/30 rounded-xl blur-3xl -z-10 scale-105"></div>
          <div className="absolute inset-0 bg-purple-700/20 rounded-xl blur-2xl -z-10 scale-110"></div>

          <div className="relative overflow-hidden rounded-xl">
            <Image
              src={dashboard}
              width={1919}
              height={830}
              alt="dashboard"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
