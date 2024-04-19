"use client";

import { createIdeasFromProfile } from "@/lib/actions/ideas.actions";
import { Button } from "./ui/button";
import { createProjectsTopicsFromContent } from "@/lib/actions/project.actions";

const GetIdeasButton = ({ isDisabled }: { isDisabled: boolean }) => {
  const handleClick = async () => {
    await createIdeasFromProfile();
    await createProjectsTopicsFromContent();
  };

  return (
    <Button
      disabled={isDisabled}
      className="bg-primary text-white"
      onClick={() => handleClick()}
    >
      Create Company Summary
    </Button>
  );
};

export default GetIdeasButton;
