import BackgroundGradient from "@/components/BackgroundGradient";
import CardsSection from "@/components/CardsSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PainAndBenefits from "@/components/PainAndBenefits";
import PricingCards from "@/components/PricingCards";
import RiskSection from "@/components/RiskSection";
import { TestComponent } from "@/components/TestComponent";
import Timeline from "@/components/Timeline";
import VideoTutorial from "@/components/VideoTutorial";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <main className="flex flex-col max-w-screen-xl items-center gap-16  mx-auto px-2 md:px-6 lg:px-12">
      <BackgroundGradient />
      <Hero />
      {/* <TestComponent /> */}
      <RiskSection />
      <WhyUs />
      {/* <PainAndBenefits /> */}
      {/* <VideoTutorial /> */}
      <Timeline />
      <CardsSection />
      <PricingCards />
      <Footer />
    </main>
  );
}
