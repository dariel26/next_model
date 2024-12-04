"use client";

import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import NumberFilter, { numberFilterFn } from "./filter/number";
import DateFilter, { dateFilterFn } from "./filter/date";
import BooleanFilter, { booleanFilterFn } from "./filter/boolean";
import SelectCell from "./cell/select";
import SelectHeader from "./header/select";
import ActionCell from "./cell/action";
import DateCell from "./cell/date";
import BooleanCell from "./cell/boolean";
import NumberCell from "./cell/number";
import CommomHeader from "./header/commom";
import StringFilter from "./filter/string";
import { GenericColumnType } from "./types/index.dt";

export function generateColumns<T>(
    genericColumns: { columnType: GenericColumnType; accessorKey: string; label: string }[]
): ColumnDef<T>[] {
    const selectColumn: ColumnDef<T> = {
        id: "select",
        header: (header) => <SelectHeader header={header} />,
        cell: (cell) => <SelectCell cell={cell} />,
        enableSorting: false,
        enableHiding: false,
    };
    const actionColumn: ColumnDef<T> = {
        id: "actions",
        cell: (cell) => <ActionCell cell={cell} />,
    };

    const dynamicColumns = genericColumns.map(({ accessorKey, columnType, label }): ColumnDef<T> => {
        const commomProps = {
            accessorKey,
            meta: { columnType },
        };

        switch (columnType) {
            case GenericColumnType.STRING:
                return {
                    ...commomProps,
                    header: (header: HeaderContext<T, unknown>) => (
                        <CommomHeader label={label} column={header.column}>
                            <StringFilter column={header.column} />
                        </CommomHeader>
                    ),
                };
            case GenericColumnType.NUMBER:
                return {
                    ...commomProps,
                    filterFn: numberFilterFn,
                    cell: (cell) => <NumberCell cell={cell} />,
                    header: (header: HeaderContext<T, unknown>) => (
                        <CommomHeader label={label} column={header.column}>
                            <NumberFilter column={header.column} />
                        </CommomHeader>
                    ),
                };
            case GenericColumnType.BOOLEAN:
                return {
                    ...commomProps,
                    filterFn: booleanFilterFn,
                    cell: (cell) => <BooleanCell cell={cell} />,
                    header: (header: HeaderContext<T, unknown>) => (
                        <CommomHeader label={label} column={header.column}>
                            <BooleanFilter column={header.column} />
                        </CommomHeader>
                    ),
                };
            case GenericColumnType.DATE:
                return {
                    ...commomProps,
                    filterFn: dateFilterFn,
                    cell: (cell) => <DateCell cell={cell} />,
                    header: (header: HeaderContext<T, unknown>) => (
                        <CommomHeader label={label} column={header.column}>
                            <DateFilter column={header.column} />
                        </CommomHeader>
                    ),
                };
        }
    });
    return [selectColumn, ...dynamicColumns, actionColumn];
}
