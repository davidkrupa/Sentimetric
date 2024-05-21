"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "./ui/button";
import LoadingSpinner from "./ui/LoadingSpinner";
import { checkoutPayment } from "@/lib/actions/transaction.action";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { PricingCardButtonProps } from "@/types";

const PricingCardButton = ({
  transactionMode,
  userId,
}: PricingCardButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    if (transactionMode !== null) {
      await checkoutPayment(transactionMode, userId);
    }
    setIsLoading(false);
  };

  return (
    <>
      <SignedIn>
        {transactionMode === null ? (
          // for free plan and signed in - redirect to dashboard
          <Button asChild variant="default" onClick={() => setIsLoading(true)}>
            <Link href="/dashboard">
              <span className={`${isLoading && "text-transparent"}`}>
                Get Started
              </span>
              {isLoading && <LoadingSpinner className="absolute text-white" />}
            </Link>
          </Button>
        ) : (
          // for paid plan and signed in - redirect to checkout
          <Button variant="default" onClick={() => handlePayment()}>
            <span className={`${isLoading && "text-transparent"}`}>
              Get Started
            </span>
            {isLoading && <LoadingSpinner className="absolute text-white" />}
          </Button>
        )}
      </SignedIn>

      {/* no account yet - need to create account first */}
      <SignedOut>
        <Button asChild variant="default" onClick={() => setIsLoading(true)}>
          <Link href="/sign-up">
            <span className={`${isLoading && "text-transparent"}`}>
              Get Started
            </span>
            {isLoading && <LoadingSpinner className="absolute text-white" />}
          </Link>
        </Button>
      </SignedOut>
    </>
  );
};

export default PricingCardButton;
