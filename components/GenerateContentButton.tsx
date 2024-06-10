"use client";

import { useState } from "react";

import {
  createProjectIdeaSection,
  createProjectSection,
} from "@/lib/actions/project.actions";
import { Button } from "./ui/button";
import LoadingSpinner from "./ui/LoadingSpinner";
import { showToastError } from "@/lib/utils";

const GenerateContentButton = ({ isDisabled }: { isDisabled: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleGenerateContent = async () => {
    setIsLoading(true);
    const introduction = await createProjectSection(
      "introduction",
      "Introduction"
    );
    if (introduction?.error) {
      showToastError(introduction.error);
      setIsLoading(false);
      return;
    }
    await createProjectIdeaSection(0);
    await createProjectIdeaSection(1);
    await createProjectIdeaSection(2);
    const conclusion = await createProjectSection("conclusion", "Conclusion");
    if (conclusion?.error) {
      showToastError(conclusion.error);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="relative max-w-min mx-auto">
        <Button
          variant="default"
          className="mx-auto"
          disabled={isLoading || isDisabled}
          onClick={() => handleGenerateContent()}
        >
          {isLoading ? "Generating..." : "Generate Project"}
        </Button>
        {isLoading && (
          <LoadingSpinner className="absolute top-0 bottom-0 -right-8 my-auto" />
        )}
      </div>
      {isLoading && (
        <p className="mt-2 max-w-md text-center text-muted-foreground">
          Please stay on this page while your request is being processed. This
          may take up to 1 minute.
        </p>
      )}
    </>
  );
};

export default GenerateContentButton;
