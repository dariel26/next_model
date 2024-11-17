import { Column } from "@tanstack/react-table";
import { ReactNode, useMemo, useState } from "react";
import DebouncedInput, { DebouncedInputProps } from "../ui/inputs/debounced-input";
import { Button } from "../ui/button";
import { Check, ListFilter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";

//TODO: Os filtros devem ser colocados na query do sistema para poder fazer o processamento no servidor.

export default function Filter<T>({ column }: { column: Column<T, unknown> }) {
    const columnFilterValue = column.getFilterValue();
    const filtered = columnFilterValue !== undefined;
    const { columnType: filterVariant } = column.columnDef.meta ?? {};

    const sortedUniqueValues = useMemo(
        () => Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000),
        [column]
    );

    switch (filterVariant) {
        case "number": {
            return (
                <FilterCombo
                    filtered={filtered}
                    debounceProps={{
                        disabled: true,
                        value: (columnFilterValue as string)?.toString() ?? "",
                        onChange: () => {},
                    }}
                >
                    <MenuContentNumber />
                </FilterCombo>
            );
        }
        case "string": {
            return (
                <FilterCombo
                    filtered={filtered}
                    debounceProps={{
                        type: "text",
                        value: (columnFilterValue as string)?.toString() ?? "",
                        onChange: (value) => column.setFilterValue(value),
                    }}
                >
                    <MenuContentString uniqueValues={sortedUniqueValues} />
                </FilterCombo>
            );
        }
        case "date": {
            <FilterCombo
                filtered={filtered}
                debounceProps={{
                    disabled: true,
                    value: (columnFilterValue as string)?.toString() ?? "",
                    onChange: () => {},
                }}
            >
                <MenuContentString uniqueValues={sortedUniqueValues} />
            </FilterCombo>;
        }
    }
}

function FilterCombo({
    children,
    debounceProps,
    filtered,
}: {
    children?: ReactNode;
    debounceProps: DebouncedInputProps;
    filtered?: boolean;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-8 w-full justify-center gap-1">
            <DebouncedInput className="h-full bg-background text-sm" {...debounceProps} />{" "}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button className="relative h-full p-2 !ring-primary" variant={"ghost"}>
                        <ListFilter className={cn(filtered && "text-primary")} />
                        {filtered && <div className="absolute bottom-0 end-0 m-1 size-2 rounded-full bg-primary" />}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="max-h-[70svh] w-56 p-0">{children}</PopoverContent>
            </Popover>
        </div>
    );
}

function MenuContentString({ uniqueValues }: { uniqueValues: string[] }) {
    const [value, setValue] = useState("");

    return (
        <>
            <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                    <CommandEmpty>No result.</CommandEmpty>
                    <CommandGroup>
                        {uniqueValues.map((uniqueValue) => (
                            <CommandItem
                                key={uniqueValue}
                                value={uniqueValue}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue);
                                }}
                            >
                                <Check
                                    className={cn("mr-2 h-4 w-4", value === uniqueValue ? "opacity-100" : "opacity-0")}
                                />
                                {uniqueValue}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </>
    );
}

export type NumberFilterType = "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "gtLt" | "gteLte";
export const numberFilterType: Record<NumberFilterType, NumberFilterType> = {
    eq: "eq",
    neq: "neq",
    gt: "gt",
    gte: "gte",
    lt: "lt",
    lte: "lte",
    gtLt: "gtLt",
    gteLte: "gteLte",
} as const;

function MenuContentNumber() {
    const [currentSelectType, setCurrentSelectType] = useState<NumberFilterType>("eq");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    return (
        <div className="flex flex-col gap-1 p-1">
            <div>
                <Select
                    value={currentSelectType}
                    onValueChange={(value: NumberFilterType) => setCurrentSelectType(value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={numberFilterType.eq}>Equals to</SelectItem>
                        <SelectItem value={numberFilterType.neq}>Does not equal</SelectItem>
                        <SelectItem value={numberFilterType.gt}>Greater then</SelectItem>
                        <SelectItem value={numberFilterType.gte}>Greater then or equal to</SelectItem>
                        <SelectItem value={numberFilterType.lt}>Lower then</SelectItem>
                        <SelectItem value={numberFilterType.lte}>Lower then or equal to</SelectItem>
                        <SelectItem value={numberFilterType.gtLt}>Between exclusive</SelectItem>
                        <SelectItem value={numberFilterType.gteLte}>Between inclusive</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {currentSelectType === "gteLte" || currentSelectType === "gtLt" ? (
                <div className="flex gap-1">
                    <DebouncedInput
                        placeholder="From"
                        type="number"
                        value={from}
                        onChange={(value) => setFrom(value.toString())}
                    />
                    <DebouncedInput
                        placeholder="To"
                        type="number"
                        value={to}
                        onChange={(value) => setTo(value.toString())}
                    />
                </div>
            ) : (
                <div className="flex">
                    <DebouncedInput
                        placeholder="Filter..."
                        type="number"
                        value={from}
                        onChange={(value) => setFrom(value.toString())}
                    />
                </div>
            )}
        </div>
    );
}
