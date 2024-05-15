import Link from "next/link";
import Header from "./Header";
import { Button, buttonVariants } from "./ui/button";

const Hero = () => {
  return (
    <div className="relative w-full">
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="text-center w-[750px] px-3 sm:px-6">
          <h1 className="text-4xl sm:text-6xl text-balance font-medium text-slate-100 mb-6">
            Impress Recruiters Get Hired Quickly
          </h1>
          <p className="text-lg lg:text-xl text-slate-500">
            Get noticed in minutes. Our quick and easy strategy works every
            time.
          </p>
          <div className="mt-8">
            <Button
              asChild
              variant="outline"
              className="bg-transparent hover:bg-slate-100  text-slate-100 hover:text-slate-900 border border-slate-100"
            >
              <Link href="#features">How it works</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
