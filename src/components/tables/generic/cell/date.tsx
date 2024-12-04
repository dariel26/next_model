import SYSTEM_ABOUT from "@/constants/system-about";
import { DateCellProps } from "./types/index.dt";

export default function DateCell<T>(props: DateCellProps<T>) {
    const date = props.cell.row.getValue("date") as Date;
    const formatted = date.toLocaleDateString(SYSTEM_ABOUT.LOCALE, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
    return <div className="font-medium">{formatted}</div>;
}
