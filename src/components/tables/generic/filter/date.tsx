import { useCallback, useMemo } from "react";
import CommomFilter from "./commom";
import DebouncedInput from "@/components/ui/inputs/debounced-input";
import { Calendar } from "@/components/ui/calendar";
import { Row } from "@tanstack/react-table";
import dateUtils from "@/lib/utils/date";
import SYSTEM_ABOUT from "@/constants/system-about";
import { DateFilterProps, DateFilterValue } from "./types/index.dt";
import { DATE_FORMAT_OPTIONS } from "@/constants/date";

const LABEL_NO_FILTER = "";

export default function DateFilter<T>({ column }: DateFilterProps<T>) {
    //VARIABES
    const setFilterValue = column.setFilterValue;
    const filterValue = column.getFilterValue() as string | undefined;

    const { from, to } = useMemo(() => {
        const _filterValue = filterValue === undefined ? filterValue : (JSON.parse(filterValue) as DateFilterValue);
        return _filterValue ?? {};
    }, [filterValue]);

    const labelFilter = useMemo(() => {
        if (filterValue === undefined) return LABEL_NO_FILTER;

        let date1: string | undefined;
        let date2: string | undefined;

        if (from !== undefined)
            date1 = new Date(from).toLocaleDateString(SYSTEM_ABOUT.LOCALE, DATE_FORMAT_OPTIONS.DATE_NUMERIC);
        if (to !== undefined)
            date2 = new Date(to).toLocaleDateString(SYSTEM_ABOUT.LOCALE, DATE_FORMAT_OPTIONS.DATE_NUMERIC);

        return `${date1 ? date1 : ""} ${date2 ? " - " + date2 : ""}`;
    }, [from, to, filterValue]);

    //EVENTS
    const handleOnChange = useCallback(
        (value?: DateFilterValue) => {
            setFilterValue(JSON.stringify(value));
        },
        [setFilterValue]
    );

    const handleOnResetFilter = useCallback(() => {
        if (filterValue === undefined) return;
        setFilterValue(undefined);
    }, [setFilterValue, filterValue]);

    return (
        <CommomFilter filterActive={filterValue !== undefined} resetFilterFn={handleOnResetFilter}>
            <DebouncedInput disabled value={labelFilter} onChange={() => {}} />
            <Calendar initialFocus mode="range" defaultMonth={from} selected={{ from, to }} onSelect={handleOnChange} />
        </CommomFilter>
    );
}

export function dateFilterFn<TData>(row: Row<TData>, columnId: string, _filterValue: string | undefined): boolean {
    if (_filterValue === undefined) return true;

    const rowValue = row.getValue(columnId) as Date | undefined | null;
    if (rowValue === null || rowValue === undefined) return false;

    const { from, to } = JSON.parse(_filterValue) as DateFilterValue;
    if (from === undefined && to === undefined) return false;

    if (from !== undefined && to === undefined) return dateUtils.compareDate(from, rowValue);
    if (from !== undefined && to !== undefined) return dateUtils.betweenRangeDate(rowValue, [from, to], "inclusive");
    return false;
}
