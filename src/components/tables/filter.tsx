import { Column, Updater } from "@tanstack/react-table";
import { ReactNode, useMemo, useState } from "react";
import DebouncedInput, { DebouncedInputProps } from "../ui/inputs/debounced-input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ListFilter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/inputs/input";

export default function Filter<T>({ column }: { column: Column<T, unknown> }) {
    const columnFilterValue = column.getFilterValue();
    const filtered = columnFilterValue !== undefined;
    const { filterVariant } = column.columnDef.meta ?? {};

    const sortedUniqueValues = useMemo(
        () => Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000),
        [column]
    );

    switch (filterVariant) {
        case "number": {
            return (
                <FilterContent
                    filtered={filtered}
                    debounceProps={{
                        disabled: true,
                        value: (columnFilterValue as string)?.toString() ?? "",
                        onChange: () => {},
                    }}
                ></FilterContent>
            );
        }
        case "enum": {
            return (
                <FilterContent
                    filtered={filtered}
                    debounceProps={{
                        type: "text",
                        value: (columnFilterValue as string[])?.join(",") ?? "",
                        onChange: (value) => column.setFilterValue(value === "" ? undefined : [value]),
                    }}
                ></FilterContent>
            );
        }
        case "string": {
            return (
                <FilterContent
                    filtered={filtered}
                    debounceProps={{
                        type: "text",
                        value: (columnFilterValue as string)?.toString() ?? "",
                        onChange: (value) => column.setFilterValue(value),
                    }}
                >
                    <MenuContentString uniqueValues={sortedUniqueValues} setFilterValues={column.setFilterValue} />
                </FilterContent>
            );
        }
    }
}

function FilterContent({
    children,
    debounceProps,
    filtered,
}: {
    children?: ReactNode;
    debounceProps: DebouncedInputProps;
    filtered?: boolean;
}) {
    return (
        <div className="flex h-8 w-full justify-center gap-1">
            <DebouncedInput className="h-full bg-background text-sm" {...debounceProps} />{" "}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="relative h-full p-2 !ring-primary" variant={"ghost"}>
                        <ListFilter className={cn(filtered && "text-primary")} />
                        {filtered && <div className="absolute bottom-0 end-0 m-1 size-2 rounded-full bg-primary" />}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-h-[70svh] p-0">{children}</DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

function MenuContentString({
    uniqueValues,
    setFilterValues,
}: {
    uniqueValues: string[];
    setFilterValues: <T>(updater: Updater<T>) => void;
}) {
    const [search, setSearch] = useState("");

    const filteredUniqueValues = uniqueValues.filter((value) => value.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <DropdownMenuGroup className="bg-sidebar-background p-1">
                <DropdownMenuItem asChild>
                    <Input
                        onKeyDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.preventDefault()}
                        className="h-8 bg-background text-sm"
                        placeholder="Search..."
                        autoFocus
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuGroup className="p-1">
                {filteredUniqueValues.map((value) => (
                    <DropdownMenuItem key={value} onClick={() => setFilterValues(value)}>
                        {value}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuGroup>
        </>
    );
}
