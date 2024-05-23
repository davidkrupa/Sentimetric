import BackgroundGradient from "@/components/BackgroundGradient";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <BackgroundGradient />
      <section className="min-h-screen flex items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-slate-100 md:text-4xl">
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light text-slate-500">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.{" "}
            </p>
            <Button asChild>
              <Link href="/">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
