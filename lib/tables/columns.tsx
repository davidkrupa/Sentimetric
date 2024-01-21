"use client";

import { CustomAnalysisParams } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CustomAnalysisParams>[] = [
  {
    accessorKey: "topic",
    header: "Topic",
    cell: ({ row }) => {
      return row.getValue("topic");
    },
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => {
      return row.getValue("content");
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return row.getValue("createdAt");
    },
  },
];
