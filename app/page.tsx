import BackgroundGradient from "@/components/BackgroundGradient";
import CardsSection from "@/components/CardsSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PricingCards from "@/components/PricingCards";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-16 max-w-screen-xl mx-auto px-2 md:px-6 lg:px-12">
      <BackgroundGradient />
      <Hero />
      <Timeline />
      <CardsSection />
      <PricingCards />
      <Footer />
    </main>
  );
}
