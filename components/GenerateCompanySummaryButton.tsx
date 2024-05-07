"use client";

import { useState } from "react";

import { creteIdeasForCompany } from "@/lib/actions/ideas.actions";
import { Button } from "./ui/button";
import LoadingSpinner from "./ui/LoadingSpinner";
import { showToastError } from "@/lib/utils";
import { createCompanySummary } from "@/lib/actions/summary.actions";

const GenerateCompanySummaryButton = ({
  isDisabled,
}: {
  isDisabled: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    const summary = await createCompanySummary();
    if (summary?.error) {
      showToastError(summary.error);
      setIsLoading(false);
      return;
    }
    const ideas = await creteIdeasForCompany();
    if (ideas?.error) {
      showToastError(ideas.error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  return (
    <div className="relative">
      <Button
        disabled={isDisabled}
        className="bg-primary text-white"
        onClick={() => handleClick()}
      >
        Create Company Summary
      </Button>
      {isLoading && (
        <LoadingSpinner className="absolute top-0 bottom-0 -right-8 my-auto" />
      )}
    </div>
  );
};

export default GenerateCompanySummaryButton;
