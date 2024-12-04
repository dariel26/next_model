export enum GenericColumnType {
    STRING = "string",
    NUMBER = "number",
    DATE = "date",
    BOOLEAN = "boolean",
}

export type GenericColumn = { columnType: GenericColumnType; accessorKey: string; label: string };
export type GenericTableProps<TData> = { genericColumns: GenericColumn[]; data: TData[] };
