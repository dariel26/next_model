import { Check } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../../ui/command";
import { cn } from "@/lib/utils/tailwind";
import { ChangeEvent, useCallback, useMemo } from "react";
import CommomFilter from "./commom";
import DebouncedInput from "@/components/ui/inputs/debounced-input";
import { StringFilterProps } from "./types/index.dt";

export default function StringFilter<T>({ column }: StringFilterProps<T>) {
    //VARIABES
    const filterValue = column.getFilterValue() as string | undefined;
    const setFilterValue = column.setFilterValue;
    const uniqueValues = useMemo(() => {
        return Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000);
    }, [column]);

    //EVENTS
    const handleOnChange = useCallback(
        (value: string | ChangeEvent<HTMLInputElement>) => {
            if (value === "") return setFilterValue(undefined);
            setFilterValue(value);
        },
        [setFilterValue]
    );

    const handleOnResetFilter = useCallback(() => {
        if (filterValue === undefined) return;
        setFilterValue(undefined);
    }, [setFilterValue, filterValue]);

    return (
        <CommomFilter filterActive={filterValue !== undefined} resetFilterFn={handleOnResetFilter}>
            <DebouncedInput value={filterValue ?? ""} onChange={handleOnChange} />
            <Command>
                <CommandInput placeholder="Search..." />
                <CommandList>
                    <CommandEmpty>No result.</CommandEmpty>
                    <CommandGroup>
                        {uniqueValues.map((uniqueValue) => (
                            <CommandItem key={uniqueValue} value={uniqueValue} onSelect={handleOnChange}>
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        filterValue === uniqueValue ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {uniqueValue}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </CommomFilter>
    );
}
