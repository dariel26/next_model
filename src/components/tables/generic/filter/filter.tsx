import { Column } from "@tanstack/react-table";
import { NumberVariant } from "./filter-variant/number-variant";
import StringVariant from "./filter-variant/string-variant";
import DateVariant from "./filter-variant/date-variant";
import BooleanVariant from "./filter-variant/boolean-variant";

export type FilterProps<T> = { column: Column<T, unknown> };

export default function Filter<T>({ column }: FilterProps<T>) {
    //VARIABLES
    const { columnType } = column.columnDef.meta ?? {};

    switch (columnType) {
        case "number": {
            return <NumberVariant column={column} />;
        }
        case "string": {
            return <StringVariant column={column} />;
        }
        case "date": {
            return <DateVariant column={column} />;
        }
        case "boolean": {
            return <BooleanVariant column={column} />;
        }
    }
}
