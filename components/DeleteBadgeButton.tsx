"use client";

import { deleteOneSkill } from "@/lib/actions/skills.actions";
import { DeleteBadgeButtonProps } from "@/types";

const DeleteBadgeButton = ({ skill, type }: DeleteBadgeButtonProps) => {
  const handleDelete = async () => {
    await deleteOneSkill(skill, type);
  };

  return (
    <button
      onClick={() => handleDelete()}
      className="absolute right-0 top-0 h-full w-full rounded-lg bg-muted/50 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
    >
      X
    </button>
  );
};

export default DeleteBadgeButton;
