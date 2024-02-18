"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = async (row: TData) => {
    await updateProfileCurrentAnalysis(row._id);
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
                className={`cursor-pointer ${
                  row.original?._id === currentId && "bg-muted/50"
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  // bug in columns definition, need to truncate here for now
                  <TableCell key={cell.id} className="max-w-[400px] truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
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
