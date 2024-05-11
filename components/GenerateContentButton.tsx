"use client";

import { useState } from "react";

import {
  createProjectIdeaSection,
  createProjectSection,
} from "@/lib/actions/project.actions";
import { Button } from "./ui/button";
import LoadingSpinner from "./ui/LoadingSpinner";

const GenerateContentButton = ({ isDisabled }: { isDisabled: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleGenerateContent = async () => {
    setIsLoading(true);
    await Promise.all([
      createProjectSection("introduction", "Introduction"),
      createProjectSection("about", "About Me"),
      createProjectSection("conclusion", "Conclusion"),
      createProjectIdeaSection(0),
      createProjectIdeaSection(1),
      createProjectIdeaSection(2),
    ]);
    setIsLoading(false);
  };

  return (
    <div className="relative">
      <Button
        variant="default"
        className="mx-auto"
        disabled={isLoading || isDisabled}
        onClick={() => handleGenerateContent()}
      >
        Generate Project
      </Button>
      {isLoading && (
        <LoadingSpinner className="absolute top-0 bottom-0 -right-8 my-auto" />
      )}
    </div>
  );
};

export default GenerateContentButton;
