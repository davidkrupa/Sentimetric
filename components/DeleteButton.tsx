"use client";

import { createActivity } from "@/lib/actions/activities.actions";
import { deleteAnalysis } from "@/lib/actions/analysis.actions";
import { IoTrashOutline } from "react-icons/io5";

const DeleteButton = ({ id }: { id: string }) => {
  const handleDelete = async () => {
    await deleteAnalysis(id);
    await createActivity("analysis", "removed");
  };
  return (
    <button
      onClick={() => handleDelete()}
      className="absolute left-1 bottom-2 hidden group-hover:block rounded-sm p-0.5"
    >
      <IoTrashOutline className="text-sm text-primary" />
    </button>
  );
};

export default DeleteButton;
