"use client";

import { useState } from "react";

import { createIdeasFromProfile } from "@/lib/actions/ideas.actions";
import { Button } from "./ui/button";
import { createProjectsTopicsFromContent } from "@/lib/actions/project.actions";
import LoadingSpinner from "./ui/LoadingSpinner";
import { showToastError } from "@/lib/utils";

const GetIdeasButton = ({ isDisabled }: { isDisabled: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    const ideas = await createIdeasFromProfile();
    if (ideas?.error) {
      showToastError(ideas.error);
      setIsLoading(false);
      return;
    }
    await createProjectsTopicsFromContent();
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

export default GetIdeasButton;
