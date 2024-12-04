import { Column } from "@tanstack/react-table";
import { ReactNode } from "react";

export type CommomFilterProps = { children?: ReactNode; filterActive?: boolean; resetFilterFn?: () => void };
export type BooleanFilterProps<T> = { column: Column<T> };
export type StringFilterProps<T> = { column: Column<T> };
export type NumberFilterProps<T> = { column: Column<T> };
export type DateFilterProps<T> = { column: Column<T> };

export enum BooleanFilterValue {
    TRUE = "True",
    FALSE = "False",
}

export type DateFilterValue = { from?: Date; to?: Date };

export enum NumberFilterValueType {
    EQ = "eq",
    NEQ = "neq",
    GT = "gt",
    GTE = "gte",
    LT = "lt",
    LTE = "lte",
    GTLT = "gtlt",
    GTELTE = "gtelte",
}
export type NumberFilterValue =
    | { type: NumberFilterValueType.EQ; to: number }
    | { type: NumberFilterValueType.NEQ; to: number }
    | { type: NumberFilterValueType.GT; to: number }
    | { type: NumberFilterValueType.GTE; to: number }
    | { type: NumberFilterValueType.LT; to: number }
    | { type: NumberFilterValueType.LTE; to: number }
    | { type: NumberFilterValueType.GTLT; from: number; to: number }
    | { type: NumberFilterValueType.GTELTE; from: number; to: number };
