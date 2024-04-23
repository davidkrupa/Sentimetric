import BackgroundGradient from "@/components/BackgroundGradient";
import Hero from "@/components/Hero";
import PricingCards from "@/components/PricingCards";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="flex flex-col gap-32 w-full px-2 md:px-6 lg:px-12">
      <BackgroundGradient />
      <Hero />
      <Timeline />
      <PricingCards />
    </main>
  );
}
