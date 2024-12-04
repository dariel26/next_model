import { Checkbox } from "@/components/ui/checkbox";
import { SelectHeaderProps } from "./types/index.dt";

export default function SelectHeader<T>(props: SelectHeaderProps<T>) {
    return (
        <div className="flex size-full items-center border-r">
            <Checkbox
                className="mx-2"
                checked={
                    props.header.table.getIsAllPageRowsSelected() ||
                    (props.header.table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => props.header.table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        </div>
    );
}
