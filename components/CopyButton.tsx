"use client";

import { Button } from "./ui/button";
import { showToastSuccess } from "@/lib/utils";

export default function CopyButton({ content }: { content: any }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    showToastSuccess("Yor project has been copied to clipboard!");
  };

  return (
    <>
      <Button variant="default" onClick={() => handleCopy()}>
        Copy Your Project
      </Button>
    </>
  );
}
