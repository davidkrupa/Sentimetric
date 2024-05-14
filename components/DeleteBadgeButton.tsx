"use client";

import { createActivity } from "@/lib/actions/activities.actions";
import { deleteOneSkill } from "@/lib/actions/skills.actions";
import { DeleteBadgeButtonProps } from "@/types";
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

import LoadingSpinner from "./ui/LoadingSpinner";
import { showToastError } from "@/lib/utils";

const DeleteBadgeButton = ({ skill, type }: DeleteBadgeButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const deletedSkill = await deleteOneSkill(skill, type);
    if (deletedSkill?.error) {
      showToastError(deletedSkill.error);
      setIsLoading(false);
      return;
    }
    await createActivity("skill", "removed");
    setIsLoading(false);
  };

  return (
    <button
      onClick={() => handleDelete()}
      className="absolute right-0 top-0 h-full w-full rounded-lg bg-muted/50 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
    >
      {!isLoading ? (
        <FaXmark className="text-sm text-destructive mx-auto" />
      ) : (
        <LoadingSpinner className="h-3 w-3 mx-auto" />
      )}
    </button>
  );
};

export default DeleteBadgeButton;
