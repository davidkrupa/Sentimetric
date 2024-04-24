import BackgroundGradient from "@/components/BackgroundGradient";
import CardsSection from "@/components/CardsSection";
import Hero from "@/components/Hero";
import PricingCards from "@/components/PricingCards";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="flex flex-col gap-16 w-full px-2 md:px-6 lg:px-12">
      <BackgroundGradient />
      <Hero />
      <Timeline />
      <CardsSection />
      <PricingCards />
    </main>
  );
}
