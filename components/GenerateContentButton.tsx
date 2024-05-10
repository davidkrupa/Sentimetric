"use client";

import {
  createProjectIdeaSection,
  createProjectSection,
} from "@/lib/actions/project.actions";
import { Button } from "./ui/button";

const GenerateContentButton = () => {
  const handleGenerateContent = async () => {
    await Promise.all([
      createProjectSection("introduction"),
      createProjectSection("about"),
      createProjectSection("conclusion"),
      createProjectIdeaSection(0),
      createProjectIdeaSection(1),
      createProjectIdeaSection(2),
    ]);
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
