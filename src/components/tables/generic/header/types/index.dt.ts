import { Column, HeaderContext } from "@tanstack/react-table";

export type CommomHeaderProps<T> = { children: JSX.Element; column: Column<T>; label?: string };
export type SelectHeaderProps<T> = { header: HeaderContext<T, unknown> };
