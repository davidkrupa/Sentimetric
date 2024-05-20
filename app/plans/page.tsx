import BackgroundGradient from "@/components/BackgroundGradient";
import PricingCardsContainer from "@/components/PricingCardsContainer";

const Page = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-16 max-w-screen-xl min-h-screen mx-auto px-2 md:px-6 lg:px-12 py-8">
      <BackgroundGradient />
      <h2 className="text-4xl tracking-tight font-bold text-slate-100">
        Choose the Perfect Plan for You
      </h2>
      <PricingCardsContainer />
    </main>
  );
};

export default Page;
