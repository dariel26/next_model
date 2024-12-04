import Order from "../order";
import { CommomHeaderProps } from "./types/index.dt";

export default function CommomHeader<T>(props: CommomHeaderProps<T>) {
    return (
        <div className="flex flex-col border-r">
            <div className="flex size-full border-b px-1 py-1">
                <Order column={props.column}> {props.label}</Order>
            </div>
            <div className="flex size-full px-1 py-1">{props.children}</div>
        </div>
    );
}
