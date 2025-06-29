import { auth } from "@clerk/nextjs";
import { FaCheck, FaXmark } from "react-icons/fa6";

import { PricingCardData } from "@/types";
import PricingCardButton from "./PricingCardButton";
import { Button } from "./ui/button";
import Link from "next/link";

const cards: PricingCardData[] = [
  {
    title: "Free",
    price: "$0",
    description: "For testing our service.",
    features: [
      "1 company profile",
      "Up to 2 partial analyses",
      "AI-powered company summary",
      "Up to 3 custom project ideas",
      "AI-powered 800-word presentation",
      "SWOT analysis for each chosen project idea",
    ],
    excludedFeatures: [],
    transactionMode: null,
  },
  {
    title: "Subscription",
    price: "$19",
    description: "Full access, cancel anytime.",
    features: [
      "10 company profiles per month",
      "Up to 5 partial analyses per company",
      "AI-powered company summaries",
      "Up to 6 custom project ideas per company",
      "AI-powered 1200-word presentations",
      "Custom presentation for each company",
      "SWOT analysis for each chosen project idea",
    ],
    excludedFeatures: [],
    transactionMode: "subscription",
  },
  {
    title: "Lifetime Access",
    price: "$39",
    description: "Use for life with one payment.",
    features: [
      "Unlimited company profiles",
      "Up to 5 partial analyses per company",
      "AI-powered company summaries",
      "Up to 6 custom project ideas per company",
      "AI-powered 1200-word presentations",
      "Custom presentation for each company",
      "SWOT analysis for each chosen project idea",
    ],
    excludedFeatures: [],
    transactionMode: "payment",
    specialOffer: true,
  },
];

const PricingCardsContainer = () => {
  const { userId }: { userId: string | null } = auth();

  return (
    <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-12 lg:space-y-0">
      {cards.map((card, i) => (
        <div
          key={card.title}
          className="relative flex flex-col text-green-500 p-6 mx-auto max-w-sm w-full text-center bg-primary/30 rounded-lg  shadow xl:p-8"
        >
          {card.specialOffer && (
            <div className="absolute top-0 right-0 mx-auto px-3 py-1 rounded-tr-lg rounded-bl-lg tracking-wider text-xs text-white font-medium bg-green-500">
              SPECIAL OFFER
            </div>
          )}
          <h3 className="mb-4 text-2xl font-semibold">{card.title}</h3>
          <p className="font-light text-slate-400 sm:text-md">
            {card.description}
          </p>
          <div className="flex justify-center items-baseline my-8">
            <span className="mr-2 text-5xl font-extrabold text-green-500">
              {card.price}
            </span>
            {card.transactionMode !== "payment" && (
              <span className="text-slate-400">/month</span>
            )}
          </div>
          {/* Card List */}
          <ul className="mb-8 space-y-4 text-left text-slate-100">
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
          <PricingCardButton
            transactionMode={card.transactionMode}
            userId={userId}
          />
        </div>
      ))}
    </div>
  );
};

export default PricingCardsContainer;
