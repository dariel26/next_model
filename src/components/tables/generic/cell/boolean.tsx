import { Check, Minus } from "lucide-react";
import { BooleanCellProps } from "./types/index.dt";

export default function BooleanCell<T>(props: BooleanCellProps<T>) {
    const scheduled = props.cell.row.getValue("scheduled") as boolean;
    return (
        <div className="flex w-full justify-center">
            {scheduled ? <Check className="h-5" /> : <Minus className="h-5" />}
        </div>
    );
}
