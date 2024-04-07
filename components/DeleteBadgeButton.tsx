"use client";

import { createActivity } from "@/lib/actions/activities.actions";
import { deleteOneSkill } from "@/lib/actions/skills.actions";
import { DeleteBadgeButtonProps } from "@/types";
import { IoTrashOutline } from "react-icons/io5";

const DeleteBadgeButton = ({ skill, type }: DeleteBadgeButtonProps) => {
  const handleDelete = async () => {
    await deleteOneSkill(skill, type);
    await createActivity("skill", "removed");
  };

  return (
    <button
      onClick={() => handleDelete()}
      className="absolute right-0 top-0 h-full w-full rounded-lg bg-muted/50 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <IoTrashOutline className="text-sm text-primary mx-auto" />
    </button>
  );
};

export default DeleteBadgeButton;
