import { Checkbox } from "@/components/ui/checkbox";
import { SelectCellProps } from "./types/index.dt";

export default function SelectCell<T>(props: SelectCellProps<T>) {
    return (
        <Checkbox
            checked={props.cell.row.getIsSelected()}
            onCheckedChange={(value) => props.cell.row.toggleSelected(!!value)}
            aria-label="Select row"
        />
    );
}
