import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Column } from "@tanstack/react-table";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { ArrowDownAZ, ArrowUpZA, Minus } from "lucide-react";
import { DropdownMenuCheckboxItem, DropdownMenuContent } from "../ui/dropdown-menu";

export default function Order<T>({ column, children }: { column: Column<T, unknown>; children?: ReactNode }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 p-2">
                    {children}
                    {column.getIsSorted() === "asc" && <ArrowDownAZ className="ml-2 h-4 w-4" />}
                    {column.getIsSorted() === "desc" && <ArrowUpZA className="ml-2 h-4 w-4" />}
                    {!column.getIsSorted() && <Minus className="ml-2 h-4 w-4" />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem
                    checked={column.getIsSorted() === "asc"}
                    onClick={() => column.toggleSorting(false)}
                >
                    Ascendent
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={column.getIsSorted() === "desc"}
                    onClick={() => column.toggleSorting(true)}
                >
                    Descendent
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={column.getIsSorted() === false}
                    onClick={() => column.toggleSorting(undefined)}
                >
                    No Sort
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
