"use client";

import { Button } from "./ui/button";

const GenerateContentButton = ({ sectionId }: { sectionId: string }) => {
  const handleGenerateContent = async () => {
    // await createSectionContent(sectionId);
  };

  return (
    <Button variant="outline" onClick={() => handleGenerateContent()}>
      Generate
    </Button>
  );
};

export default GenerateContentButton;
