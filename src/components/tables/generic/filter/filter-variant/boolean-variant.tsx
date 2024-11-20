import { useCallback, useMemo } from "react";
import { FilterProps } from "../filter";
import VariantCommon from "./variant-common";
import DebouncedInput from "@/components/ui/inputs/debounced-input";
import { Row } from "@tanstack/react-table";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type BooleanVariantProps<T> = {} & FilterProps<T>;

export default function BooleanVariant<T>({ column }: BooleanVariantProps<T>) {
    //VARIABES
    const setFilterValue = column.setFilterValue;
    const filterValue = column.getFilterValue() as TBooleanFilterValueModel | undefined;

    const filterFeedback = useMemo(() => {
        if (filterValue === undefined) return "";

        return filterValue === "checked" ? "Checked" : "Unchecked";
    }, [filterValue]);

    //EVENTS
    const handleOnChange = useCallback(
        (value?: TBooleanFilterValueModel) => {
            setFilterValue(value);
        },
        [setFilterValue]
    );

    const handleOnResetFilter = useCallback(() => {
        if (filterValue === undefined) return;
        setFilterValue(undefined);
    }, [setFilterValue, filterValue]);

    return (
        <VariantCommon filterActive={filterValue !== undefined} resetFilterFn={handleOnResetFilter}>
            <DebouncedInput disabled value={filterFeedback} onChange={() => {}} />
            <div className="w-full p-1">
                <Select
                    value={filterValue ?? ""}
                    onValueChange={(value) => handleOnChange(value as TBooleanFilterValueModel)}
                >
                    <SelectTrigger className="h-8">
                        <SelectValue placeholder="Select filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={booleanFilterValueModel("checked")}>Checked</SelectItem>
                        <SelectItem value={booleanFilterValueModel("unchecked")}>Unchecked</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </VariantCommon>
    );
}

type TBooleanFilterValueModel = "checked" | "unchecked";
const booleanFilterValueModel = (value: TBooleanFilterValueModel) => value;

export function booleanFilterFn<TData>(
    row: Row<TData>,
    columnId: string,
    filterValue: TBooleanFilterValueModel | undefined
): boolean {
    if (filterValue === undefined) return true;

    const rowValue = row.getValue(columnId) as boolean | undefined | null;
    if (rowValue === null || rowValue === undefined) return false;

    if (filterValue === "checked" && rowValue) return true;
    else if (filterValue === "unchecked" && !rowValue) return true;
    return false;
}
