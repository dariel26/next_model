import { NumberCellProps } from "./types/index.dt";
import SYSTEM_ABOUT from "@/constants/system-about";

export default function NumberCell<T>(props: NumberCellProps<T>) {
    const amount = parseFloat(props.cell.row.getValue("amount"));
    const formatted = new Intl.NumberFormat(SYSTEM_ABOUT.LOCALE, {
        style: "currency",
        currency: "BRL",
    }).format(amount);

    return <div className="text-right font-medium">{formatted}</div>;
}
