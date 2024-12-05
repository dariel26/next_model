import { useCallback, useMemo } from "react";
import CommomFilter from "./commom";
import DebouncedInput from "@/components/ui/inputs/debounced-input";
import { Row } from "@tanstack/react-table";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BooleanFilterProps, BooleanFilterValue } from "./types/index.dt";

const LABEL_FILTER_TRUE = "Checked";
const LABEL_FILTER_FALSE = "Unchecked";
const LABEL_NO_FILTER = "";

export default function BooleanFilter<T>({ column }: BooleanFilterProps<T>) {
    //VARIABES
    const setFilterValue = column.setFilterValue;
    const filterValue = column.getFilterValue() as BooleanFilterValue | undefined;

    const filterFeedback = useMemo(() => {
        if (filterValue === undefined) return LABEL_NO_FILTER;

        return filterValue === BooleanFilterValue.TRUE ? LABEL_FILTER_TRUE : LABEL_FILTER_FALSE;
    }, [filterValue]);

    //EVENTS
    const handleOnChange = useCallback(
        (value?: BooleanFilterValue) => {
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
            <DebouncedInput disabled initialValue={filterFeedback} onChange={() => {}} />
            <div className="w-full p-1">
                <Select
                    value={filterValue ?? LABEL_NO_FILTER}
                    onValueChange={(value) => handleOnChange(value as BooleanFilterValue)}
                >
                    <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={BooleanFilterValue.TRUE}>{LABEL_FILTER_TRUE}</SelectItem>
                        <SelectItem value={BooleanFilterValue.FALSE}>{LABEL_FILTER_FALSE}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CommomFilter>
    );
}

export function booleanFilterFn<TData>(
    row: Row<TData>,
    columnId: string,
    filterValue: BooleanFilterValue | undefined
): boolean {
    if (filterValue === undefined) return true;

    const rowValue = row.getValue(columnId) as boolean | undefined | null;
    if (rowValue === null || rowValue === undefined) return false;

    if (filterValue === BooleanFilterValue.TRUE && rowValue) return true;
    else if (filterValue === BooleanFilterValue.FALSE && !rowValue) return true;
    return false;
}
