import Link from "next/link";
import Header from "./Header";
import { buttonVariants } from "./ui/button";

const Hero = () => {
  return (
    <div className="relative">
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="text-center w-[750px] px-3 sm:px-6">
          <h1 className="text-2xl sm:text-6xl font-medium text-muted mb-6">
            Tools for doing proactive business
          </h1>
          <p className="text-xl text-muted-foreground">
            Let us revolutionize the way you connect with new customers and
            elevate your service offerings to new heights!
          </p>
          <div className="mt-8">
            <Link href="#" className={buttonVariants({ variant: "outline" })}>
              How it works
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
