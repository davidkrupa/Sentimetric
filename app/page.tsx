import BackgroundGradient from "@/components/BackgroundGradient";
import CardsSection from "@/components/CardsSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PainAndBenefits from "@/components/PainAndBenefits";
import PricingCards from "@/components/PricingCards";
import Timeline from "@/components/Timeline";
import VideoTutorial from "@/components/VideoTutorial";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-16 max-w-screen-xl mx-auto px-2 md:px-6 lg:px-12">
      <BackgroundGradient />
      <Hero />
      <PainAndBenefits />
      <Timeline />
      <VideoTutorial />
      <CardsSection />
      <PricingCards />
      <Footer />
    </main>
  );
}
