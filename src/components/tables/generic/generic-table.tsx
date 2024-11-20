"use client";

import {
    RowData,
    ColumnDef,
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
    Table as TableProps,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils/tailwind";
import Filter from "./filter/filter";

export type ColumnType = "string" | "number" | "date" | "boolean";

declare module "@tanstack/react-table" {
    interface ColumnMeta<TData extends RowData, TValue> {
        columnType?: ColumnType;
        data?: TData[];
        value?: TValue;
    }
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function GenericTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

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
                <TableHeader className="bg-sidebar-background">
                    <HeaderTitles table={table} />
                    <HeaderFilter table={table} />
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
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="m-2 flex items-center justify-end gap-1">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{" "}
                    row(s) selected.
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </Button>
            </div>
        </div>
    );
}

function HeaderTitles<TData>(props: { table: TableProps<TData> }) {
    return (
        <>
            {props.table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        const { columnType } = header.column.columnDef.meta ?? {};
                        return (
                            <TableHead
                                key={header.id}
                                className={cn("border py-1", columnType === "number" && "text-end")}
                            >
                                {header.isPlaceholder ? null : (
                                    <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                                )}
                            </TableHead>
                        );
                    })}
                </TableRow>
            ))}
        </>
    );
}

function HeaderFilter<TData>(props: { table: TableProps<TData> }) {
    return (
        <>
            {props.table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        const { columnType } = header.column.columnDef.meta ?? {};

                        return (
                            <TableHead key={header.id} className={cn("py-1", columnType === "number" && "text-end")}>
                                {header.isPlaceholder ? null : (
                                    <div>
                                        {header.column.getCanFilter() ? <Filter column={header.column} /> : undefined}
                                    </div>
                                )}
                            </TableHead>
                        );
                    })}
                </TableRow>
            ))}
        </>
    );
}
