"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "./ui/button";
import LoadingSpinner from "./ui/LoadingSpinner";

const PricingCardButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button asChild variant="default" onClick={() => setIsLoading(true)}>
      <Link href="/sign-up">
        <span className={`${isLoading && "text-transparent"}`}>
          Get Started
        </span>
        {isLoading && <LoadingSpinner className="absolute text-white" />}
      </Link>
    </Button>
  );
};

export default PricingCardButton;
