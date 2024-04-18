"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaXmark } from "react-icons/fa6";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateProfileCurrentAnalysis } from "@/lib/actions/profile.actions";
import { SingleAnalysisData } from "@/types";
import LoadingSpinner from "./ui/LoadingSpinner";
import { Button } from "./ui/button";
import { deleteAnalysis } from "@/lib/actions/analysis.actions";
import { createActivity } from "@/lib/actions/activities.actions";

interface DataTableProps<TData extends SingleAnalysisData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  currentId: string;
}

export function DataTable<TData extends SingleAnalysisData, TValue>({
  columns,
  data,
  currentId,
}: DataTableProps<TData, TValue>) {
  const [isLoading, setIsLoading] = useState(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = async (row: TData) => {
    await updateProfileCurrentAnalysis(row._id);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    await deleteAnalysis(id);
    await createActivity("analysis", "removed");
    setIsLoading(false);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, i) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => handleRowClick(row.original)}
                className={`cursor-pointer relative group ${
                  row.original?._id === currentId && "bg-muted/50"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  // bug in columns definition, need to truncate here for now
                  <TableCell key={cell.id} className="max-w-[400px] truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <div className="absolute group-hover:opacity-100 opacity-0 justify-center top-0 right-3 bottom-0 z-30 flex items-center size-8 rounded-md bg-background my-auto border">
                  {!isLoading ? (
                    <Button
                      size="xs"
                      variant="outline"
                      className="p-0 hover:bg-background border-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(row.original._id);
                      }}
                    >
                      <FaXmark className="text-destructive" />
                    </Button>
                  ) : (
                    <LoadingSpinner className="size-4" />
                  )}
                </div>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No analysis yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
