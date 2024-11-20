"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Check, Minus, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "../../ui/checkbox";
import Order from "./order";
import { numberFilterFn } from "./filter/filter-variant/number-variant";
import SYSTEM_ABOUT from "@/constants/system-about";
import { dateFilterFn } from "./filter/filter-variant/date-variant";
import { booleanFilterFn } from "./filter/filter-variant/boolean-variant";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
    date: Date;
    scheduled: boolean;
};

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                className="me-2"
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: ({ column }) => <Order column={column}> Status </Order>,
        meta: { columnType: "string" },
    },
    {
        accessorKey: "email",
        header: ({ column }) => <Order column={column}> Email </Order>,
        meta: { columnType: "string" },
    },
    {
        accessorKey: "date",
        header: ({ column }) => <Order column={column}> Date </Order>,
        meta: { columnType: "date" },
        filterFn: dateFilterFn,
        cell: ({ row }) => {
            const date = row.getValue("date") as Date;
            const formatted = date.toLocaleDateString(SYSTEM_ABOUT.LOCALE, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
            return <div className="font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "scheduled",
        header: ({ column }) => <Order column={column}>Scheduled</Order>,
        meta: { columnType: "boolean" },
        filterFn: booleanFilterFn,
        cell: ({ row }) => {
            const scheduled = row.getValue("scheduled") as boolean;
            return (
                <div className="flex w-full justify-center">
                    {scheduled ? <Check className="h-5" /> : <Minus className="h-5" />}
                </div>
            );
        },
    },
    {
        accessorKey: "amount",
        meta: { columnType: "number" },
        header: ({ column }) => <Order column={column}>Amount</Order>,
        filterFn: numberFilterFn,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat(SYSTEM_ABOUT.LOCALE, {
                style: "currency",
                currency: "BRL",
            }).format(amount);

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
