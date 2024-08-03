import Link from "next/link";
import Header from "./Header";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="relative w-full">
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="text-center w-[750px] px-3 sm:px-6">
          <h1 className="text-4xl leading-tight sm:text-6xl sm:leading-tight text-balance font-medium text-slate-100 mb-6">
            Make Recruiters Need To Hire You
          </h1>
          <p className="text-lg lg:text-xl text-slate-400">
            {/* {`Create a personalized presentation with three project ideas in less than half an hour using our AI tools - guaranteed
            to be a magnet for recruiters.`} */}
            {`Craft AI-generated job-winning presentations tailored to your skills and highlighting opportunities to boost profits in your target company.`}
          </p>
          <div className="mt-8">
            <Button
              asChild
              variant="outline"
              className="bg-transparent hover:bg-slate-100  text-slate-100 hover:text-slate-900 border border-slate-100"
            >
              <Link href="#pricing">Start Your Project</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
