import { useCallback, useMemo } from "react";
import { FilterProps } from "../filter";
import VariantCommon from "./variant-common";
import DebouncedInput from "@/components/ui/inputs/debounced-input";
import { Calendar } from "@/components/ui/calendar";
import { Row } from "@tanstack/react-table";
import dateUtils from "@/lib/utils/date";
import SYSTEM_ABOUT from "@/constants/system-about";

export type TDateFilterValueModel = { from?: Date; to?: Date };
export type DateVariantProps<T> = {} & FilterProps<T>;

export default function DateVariant<T>({ column }: DateVariantProps<T>) {
    //VARIABES
    const setFilterValue = column.setFilterValue;
    const filterValue = column.getFilterValue() as string | undefined;
    const { from, to } = useMemo(() => {
        const _filterValue =
            filterValue === undefined ? filterValue : (JSON.parse(filterValue) as TDateFilterValueModel);
        return _filterValue ?? {};
    }, [filterValue]);

    const filterFeedback = useMemo(() => {
        if (filterValue === undefined) return "";

        let date1: string | undefined;
        let date2: string | undefined;
        if (from !== undefined)
            date1 = new Date(from).toLocaleDateString(SYSTEM_ABOUT.LOCALE, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        if (to !== undefined)
            date2 = new Date(to).toLocaleDateString(SYSTEM_ABOUT.LOCALE, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });

        return `${date1 ? date1 : ""} ${date2 ? " - " + date2 : ""}`;
    }, [from, to, filterValue]);

    //EVENTS
    const handleOnChange = useCallback(
        (value?: TDateFilterValueModel) => {
            setFilterValue(JSON.stringify(value));
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
            <Calendar initialFocus mode="range" defaultMonth={from} selected={{ from, to }} onSelect={handleOnChange} />
        </VariantCommon>
    );
}

export function dateFilterFn<TData>(
    row: Row<TData>,
    columnId: string,
    _filterValue: string | undefined,
): boolean {
    if (_filterValue === undefined) return true;

    const rowValue = row.getValue(columnId) as Date | undefined | null;
    if (rowValue === null || rowValue === undefined) return false;

    const { from, to } = JSON.parse(_filterValue) as TDateFilterValueModel;
    if (from === undefined && to === undefined) return false;

    if (from !== undefined && to === undefined) return dateUtils.compareDate(from, rowValue);
    if (from !== undefined && to !== undefined) return dateUtils.betweenRangeDate(rowValue, [from, to], "inclusive");
    return false;
}
