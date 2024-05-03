"use client";

import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

import { createActivity } from "@/lib/actions/activities.actions";
import { deleteAnalysis } from "@/lib/actions/analysis.actions";
import { Button } from "./ui/button";
import LoadingSpinner from "./ui/LoadingSpinner";
import { showToastError } from "@/lib/utils";

const DeleteButton = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const analysis = await deleteAnalysis(id);
    if (analysis?.error) {
      showToastError(analysis.error);
      setIsLoading(false);
      return;
    }
    await createActivity("analysis", "removed");
    setIsLoading(false);
  };
  return (
    <Button
      onClick={() => handleDelete()}
      size="xs"
      variant="outline"
      className="px-1 hover:bg-background hidden group-hover:block"
    >
      {isLoading ? (
        <LoadingSpinner className="size-3" />
      ) : (
        <FaXmark className="text-sm text-destructive" />
      )}
    </Button>
  );
};

export default DeleteButton;
