import { PricingCardData } from "@/types";
import { FaCheck, FaXmark } from "react-icons/fa6";
import PricingCardButton from "./PricingCardButton";

const cards: PricingCardData[] = [
  {
    title: "Basic",
    price: "$0",
    description: "Test our service. No credit card needed.",
    features: [
      "1 company profile",
      "Up to 2 partial analyses per company",
      "AI-powered company summary",
      "2 project ideas tailored to you",
      "One 600-word presentation",
      "1 SWOT analysis included",
    ],
    excludedFeatures: [],
    transactionMode: null,
  },
  {
    title: "Pro",
    price: "$29",
    description: "Get access to all AI tools. Cancel anytime.",
    features: [
      "10 company profiles per month",
      "Up to 5 partial analyses per company",
      "AI-powered company summaries",
      "6 custom project ideas per company",
      "AI-powered 1200-word presentations",
      "Custom presentation for each company",
      "SWOT analysis for each chosen project idea",
    ],
    excludedFeatures: [],
    transactionMode: "subscription",
  },
  {
    title: "Pro Lifetime",
    price: "$99",
    description: "Lifetime access to all our AI tools and future updates.",
    features: [
      "Unlimited company profiles",
      "Up to 5 partial analyses per company",
      "AI-powered company summaries",
      "6 custom project ideas per company",
      "AI-powered 1200-word presentations",
      "Custom presentation for each company",
      "SWOT analysis for each chosen project idea",
    ],
    excludedFeatures: [],
    transactionMode: "payment",
  },
];

const PricingCardsContainer = () => {
  return (
    <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex flex-col p-6 mx-auto max-w-lg text-center text-slate-900 bg-white rounded-lg border border-border shadow xl:p-8"
        >
          <h3 className="mb-4 text-2xl font-semibold">{card.title}</h3>
          <p className="font-light text-slate-500 sm:text-lg">
            {card.description}
          </p>
          <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-5xl font-extrabold">{card.price}</span>
            {card.transactionMode !== "payment" && (
              <span className="text-slate-500">/month</span>
            )}
          </div>
          {/* Card List */}
          <ul className="mb-8 space-y-4 text-left">
            <>
              {/* Included Features */}
              {card.features.map((feature) => (
                <li key={feature} className="flex items-center space-x-3">
                  <div className="size-4">
                    <FaCheck className="text-green-500 size-4" />
                  </div>
                  <p className="text-sm">{feature}</p>
                </li>
              ))}
              {/* Excluded Features */}
              {card.excludedFeatures?.map((feature) => (
                <li key={feature} className="flex items-center space-x-3">
                  <div className="size-4">
                    <FaXmark className="text-destructive size-4" />
                  </div>
                  <span className="line-through text-sm">{feature}</span>
                </li>
              ))}
            </>
          </ul>

          <PricingCardButton transactionMode={card.transactionMode} />
        </div>
      ))}
    </div>
  );
};

export default PricingCardsContainer;
