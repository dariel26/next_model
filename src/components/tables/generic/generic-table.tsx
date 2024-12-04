"use client";

import {
    RowData,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
    getFacetedUniqueValues,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../../ui/button";
import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils/tailwind";
import { generateColumns } from "./columns";
import { GenericColumnType, GenericTableProps } from "./types/index.dt";

declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        columnType?: GenericColumnType;
        data?: TData[];
        value?: TValue;
    }
}

const LABEL_NO_DATA_RESULT = "No results.";
const LABEL_PREVIOUS_BUTTON_PAGE = "Previous";
const LABEL_NEXT_BUTTON_PAGE = "Next";

export function GenericTable<TData>({ genericColumns, data }: GenericTableProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const columns = useMemo(() => generateColumns(genericColumns), [genericColumns]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="relative grid h-full grid-rows-[1fr_auto] overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="bg-sidebar-background">
                            {headerGroup.headers.map((header) => {
                                const { columnType } = header.column.columnDef.meta ?? {};
                                return (
                                    <TableHead
                                        key={header.id}
                                        className={cn("p-0", columnType === "number" && "text-end")}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div className="size-full">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </div>
                                        )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                {LABEL_NO_DATA_RESULT}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="m-2 flex items-center justify-end gap-1">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{" "}
                    row(s) selected.
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {LABEL_PREVIOUS_BUTTON_PAGE}
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    {LABEL_NEXT_BUTTON_PAGE}
                </Button>
            </div>
        </div>
    );
}
