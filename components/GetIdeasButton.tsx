"use client";

import { createIdeasFromProfile } from "@/lib/actions/ideas.actions";
import { Button } from "./ui/button";

const GetIdeasButton = () => {
  const handleClick = async () => {
    await createIdeasFromProfile();
  };

  return (
    <Button className="bg-primary text-white" onClick={() => handleClick()}>
      Analyze Profile
    </Button>
  );
};

export default GetIdeasButton;
