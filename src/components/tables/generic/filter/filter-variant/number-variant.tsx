import DebouncedInput from "@/components/ui/inputs/debounced-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FilterProps } from "../filter";
import VariantCommon from "./variant-common";
import { Row } from "@tanstack/react-table";

export type NumberVariantProps<T> = {} & FilterProps<T>;

export function NumberVariant<T>({ column }: NumberVariantProps<T>) {
    //STATES
    const [currentSelectType, setCurrentSelectType] = useState<NumberFilterType>("eq");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    //VARIABLES
    const filterValue = column.getFilterValue();
    const _setFilterValue = column.setFilterValue;

    const filterFeedback = useMemo(() => {
        if (filterValue === undefined) return "";
        switch (currentSelectType) {
            case "eq":
                return `= ${to}`;
            case "neq":
                return `!= ${to}`;
            case "gt":
                return `> ${to}`;
            case "gte":
                return `>= ${to}`;
            case "lt":
                return `< ${to}`;
            case "lte":
                return `<= ${to}`;
            case "gtLt":
                return `> ${from} OR < ${to}`;
            case "gteLte":
                return `>= ${from} OR <= ${to}`;
        }
    }, [from, to, currentSelectType, filterValue]);

    //EVENTS
    useEffect(() => {
        const setFilterValue = (value?: Partial<Record<NumberFilterType, number>>) => {
            _setFilterValue(JSON.stringify(value));
        };

        switch (currentSelectType) {
            case "gtLt":
                if (from === "" || to === "") return setFilterValue(undefined);
                return setFilterValue({ gt: Number(from), lt: Number(to) });
            case "gteLte":
                if (from === "" || to === "") return setFilterValue(undefined);
                return setFilterValue({ gte: Number(from), lte: Number(to) });
            default:
                if (to === "") return setFilterValue(undefined);
                return setFilterValue({ [currentSelectType]: Number(to) });
        }
    }, [_setFilterValue, to, from, currentSelectType]);

    const handleOnResetFilter = useCallback(() => {
        if (filterValue === undefined) return;
        setFrom("");
        setTo("");
        _setFilterValue(undefined);
    }, [_setFilterValue, filterValue]);

    return (
        <VariantCommon filterActive={filterValue !== undefined} resetFilterFn={handleOnResetFilter}>
            <DebouncedInput value={filterFeedback} onChange={() => {}} disabled />
            <div className="flex flex-col gap-1 p-1">
                <div>
                    <Select
                        value={currentSelectType ?? ""}
                        onValueChange={(value) => setCurrentSelectType(value as NumberFilterType)}
                    >
                        <SelectTrigger className="h-8">
                            <SelectValue placeholder="Select filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={numberFilterType("eq")}>Equals to</SelectItem>
                            <SelectItem value={numberFilterType("neq")}>Does not equal</SelectItem>
                            <SelectItem value={numberFilterType("gt")}>Greater then</SelectItem>
                            <SelectItem value={numberFilterType("gte")}>Greater then or equal to</SelectItem>
                            <SelectItem value={numberFilterType("lt")}>Lower then</SelectItem>
                            <SelectItem value={numberFilterType("lte")}>Lower then or equal to</SelectItem>
                            <SelectItem value={numberFilterType("gtLt")}>Between exclusive</SelectItem>
                            <SelectItem value={numberFilterType("gteLte")}>Between inclusive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {currentSelectType === "gteLte" || currentSelectType === "gtLt" ? (
                    <div className="flex gap-1">
                        <DebouncedInput
                            className="h-8 text-sm"
                            placeholder="From"
                            type="number"
                            value={from}
                            onChange={(value) => setFrom(value.toString())}
                        />
                        <DebouncedInput
                            className="h-8 text-sm"
                            placeholder="To"
                            type="number"
                            value={to}
                            onChange={(value) => setTo(value.toString())}
                        />
                    </div>
                ) : (
                    <div className="flex">
                        <DebouncedInput
                            className="h-8 text-sm"
                            placeholder="Filter..."
                            type="number"
                            value={to}
                            onChange={(value) => setTo(value.toString())}
                        />
                    </div>
                )}
            </div>
        </VariantCommon>
    );
}

type NumberFilterType = "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "gtLt" | "gteLte";
const numberFilterType = (type: NumberFilterType): NumberFilterType => type;

export function numberFilterFn<TData>(row: Row<TData>, columnId: string, _filterValue: string | undefined): boolean {
    if (_filterValue === undefined) return true;

    const rowValue = row.getValue(columnId) as number | undefined | null;
    if (rowValue === null || rowValue === undefined) return false;

    const filterValue = JSON.parse(_filterValue) as Partial<Record<NumberFilterType, string>>;
    const keysInFilterValue = Object.keys(filterValue);

    if (keysInFilterValue.length === 1)
        if (filterValue.eq) return rowValue === Number(filterValue.eq);
        else if (filterValue.neq) return rowValue !== Number(filterValue.neq);
        else if (filterValue.gt) return rowValue > Number(filterValue.gt);
        else if (filterValue.gte) return rowValue >= Number(filterValue.gte);
        else if (filterValue.lt) return rowValue < Number(filterValue.lt);
        else if (filterValue.lte) return rowValue <= Number(filterValue.lte);
        else return false;
    else if (keysInFilterValue.length === 2)
        if (filterValue.gt && filterValue.lt)
            return rowValue > Number(filterValue.gt) && rowValue < Number(filterValue.lt);
        else if (filterValue.gte && filterValue.lte)
            return rowValue >= Number(filterValue.gte) && rowValue <= Number(filterValue.lte);
        else return false;

    return false;
}
