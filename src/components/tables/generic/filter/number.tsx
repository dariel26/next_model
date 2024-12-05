import DebouncedInput from "@/components/ui/inputs/debounced-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCallback, useEffect, useMemo, useState } from "react";
import CommomFilter from "./commom";
import { Row } from "@tanstack/react-table";
import { NumberFilterProps, NumberFilterValue, NumberFilterValueType } from "./types/index.dt";

const LABEL_NO_FILTER = "";
const EQUAL_TO = { label: "Equals to", simbol: "=" };
const NOT_EQUAL_TO = { label: "Does not equal", simbol: "!=" };
const GREATHER_THEN = { label: "Greater then", simbol: ">" };
const GREATHER_THEN_EQUAL = { label: "Grater then or equal to", simbol: ">=" };
const LOWER_THEN = { label: "Lower then", simbol: "<" };
const LOWER_THEN_EQUAL = { label: "Lower then or equal to", simbol: "<=" };
const OR = "OR";
const BETWEEN_LABEL_EXCLUSIVE = "Between exclusive";
const BETWEEN_LABEL_INCLUSIVE = "Between inclusive";

export default function NumberFilter<T>({ column }: NumberFilterProps<T>) {
    //STATES
    const [currentValueType, setCurrentValueType] = useState<NumberFilterValueType>(NumberFilterValueType.EQ);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    //VARIABLES
    const filterValue = column.getFilterValue() as string | undefined;
    const _setFilterValue = column.setFilterValue;

    const labelFilter = useMemo(() => {
        if (filterValue === undefined) return LABEL_NO_FILTER;
        const _filterValue = JSON.parse(filterValue) as NumberFilterValue;

        switch (_filterValue.type) {
            case NumberFilterValueType.EQ:
                return `${EQUAL_TO.simbol} ${_filterValue.to}`;
            case NumberFilterValueType.NEQ:
                return `${NOT_EQUAL_TO.simbol} ${_filterValue.to}`;
            case NumberFilterValueType.GT:
                return `${GREATHER_THEN.simbol} ${_filterValue.to}`;
            case NumberFilterValueType.GTE:
                return `${GREATHER_THEN_EQUAL.simbol} ${_filterValue.to}`;
            case NumberFilterValueType.LT:
                return `${LOWER_THEN.simbol} ${_filterValue.to}`;
            case NumberFilterValueType.LTE:
                return `${LOWER_THEN_EQUAL.simbol} ${_filterValue.to}`;
            case NumberFilterValueType.GTLT:
                return `${GREATHER_THEN.simbol} ${_filterValue.from} ${OR} ${LOWER_THEN.simbol} ${_filterValue.to}`;
            case NumberFilterValueType.GTELTE:
                return `${GREATHER_THEN_EQUAL.simbol} ${_filterValue.from} ${OR} ${LOWER_THEN_EQUAL.simbol} ${_filterValue.to}`;
        }
    }, [filterValue]);

    //EVENTS
    useEffect(() => {
        const setFilterValue = (value?: NumberFilterValue) => {
            _setFilterValue(JSON.stringify(value));
        };

        switch (currentValueType) {
            case NumberFilterValueType.GTLT:
                if (from === "" || to === "") return setFilterValue(undefined);
                return setFilterValue({ type: NumberFilterValueType.GTLT, from: Number(from), to: Number(to) });
            case NumberFilterValueType.GTELTE:
                if (from === "" || to === "") return setFilterValue(undefined);
                return setFilterValue({ type: NumberFilterValueType.GTELTE, from: Number(from), to: Number(to) });
            default:
                if (to === "") return setFilterValue(undefined);
                return setFilterValue({ type: currentValueType, to: Number(to) });
        }
    }, [_setFilterValue, to, from, currentValueType]);

    const handleOnResetFilter = useCallback(() => {
        if (filterValue === undefined) return;
        setFrom("");
        setTo("");
        _setFilterValue(undefined);
    }, [_setFilterValue, filterValue]);

    return (
        <CommomFilter filterActive={filterValue !== undefined} resetFilterFn={handleOnResetFilter}>
            <DebouncedInput initialValue={labelFilter} onChange={() => {}} disabled />
            <div className="flex flex-col gap-1 p-1">
                <div>
                    <Select
                        value={currentValueType ?? ""}
                        onValueChange={(value) => setCurrentValueType(value as NumberFilterValueType)}
                    >
                        <SelectTrigger className="h-8">
                            <SelectValue placeholder="Select filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={NumberFilterValueType.EQ}>{EQUAL_TO.label}</SelectItem>
                            <SelectItem value={NumberFilterValueType.NEQ}>{NOT_EQUAL_TO.label}</SelectItem>
                            <SelectItem value={NumberFilterValueType.GT}>{GREATHER_THEN.label}</SelectItem>
                            <SelectItem value={NumberFilterValueType.GTE}>{GREATHER_THEN_EQUAL.label}</SelectItem>
                            <SelectItem value={NumberFilterValueType.LT}>{LOWER_THEN.label}</SelectItem>
                            <SelectItem value={NumberFilterValueType.LTE}>{LOWER_THEN_EQUAL.label}</SelectItem>
                            <SelectItem value={NumberFilterValueType.GTLT}>{BETWEEN_LABEL_EXCLUSIVE}</SelectItem>
                            <SelectItem value={NumberFilterValueType.GTELTE}>{BETWEEN_LABEL_INCLUSIVE}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {currentValueType === NumberFilterValueType.GTELTE ||
                currentValueType === NumberFilterValueType.GTLT ? (
                    <div className="flex gap-1">
                        <DebouncedInput
                            className="h-8 text-sm"
                            placeholder="From"
                            type="number"
                            initialValue={from}
                            onChange={(value) => setFrom(value.toString())}
                        />
                        <DebouncedInput
                            className="h-8 text-sm"
                            placeholder="To"
                            type="number"
                            initialValue={to}
                            onChange={(value) => setTo(value.toString())}
                        />
                    </div>
                ) : (
                    <div className="flex">
                        <DebouncedInput
                            className="h-8 text-sm"
                            placeholder="Filter..."
                            type="number"
                            initialValue={to}
                            onChange={(value) => setTo(value.toString())}
                        />
                    </div>
                )}
            </div>
        </CommomFilter>
    );
}

export function numberFilterFn<TData>(row: Row<TData>, columnId: string, _filterValue: string | undefined): boolean {
    if (_filterValue === undefined) return true;

    const rowValue = row.getValue(columnId) as number | undefined | null;
    if (rowValue === null || rowValue === undefined) return false;

    const filterValue = JSON.parse(_filterValue) as NumberFilterValue;

    switch (filterValue.type) {
        case NumberFilterValueType.EQ:
            return rowValue === Number(filterValue.to);
        case NumberFilterValueType.NEQ:
            return rowValue !== Number(filterValue.to);
        case NumberFilterValueType.GT:
            return rowValue > Number(filterValue.to);
        case NumberFilterValueType.GTE:
            return rowValue >= Number(filterValue.to);
        case NumberFilterValueType.LT:
            return rowValue < Number(filterValue.to);
        case NumberFilterValueType.LTE:
            return rowValue <= Number(filterValue.to);
        case NumberFilterValueType.GTLT:
            return rowValue > Number(filterValue.from) && rowValue < Number(filterValue.to);
        case NumberFilterValueType.GTELTE:
            return rowValue >= Number(filterValue.from) && rowValue <= Number(filterValue.to);
    }
}
