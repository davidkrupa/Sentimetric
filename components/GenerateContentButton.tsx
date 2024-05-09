"use client";

import { createProjectSection } from "@/lib/actions/project.actions";
import { Button } from "./ui/button";

const GenerateContentButton = ({ sectionId }: { sectionId?: string }) => {
  // need to receive current sections ids
  const handleGenerateContent = async () => {
    // await createProjectSection("");
  };

  return (
    <Button
      variant="default"
      className="mx-auto"
      onClick={() => handleGenerateContent()}
    >
      Generate Project
    </Button>
  );
};

export default GenerateContentButton;
