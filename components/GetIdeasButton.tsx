"use client";

import { createIdeasFromProfile } from "@/lib/actions/ideas.actions";
import { Button } from "./ui/button";
import { createProjectsTopicsFromContent } from "@/lib/actions/project.actions";

const GetIdeasButton = () => {
  const handleClick = async () => {
    await createIdeasFromProfile();
    await createProjectsTopicsFromContent();
  };

  return (
    <Button className="bg-primary text-white" onClick={() => handleClick()}>
      Analyze Profile
    </Button>
  );
};

export default GetIdeasButton;
