import { NoContentListProps } from "./list.types";

export default function NoContentList(props: NoContentListProps) {
    return (
        <div className="flex w-full flex-col items-center gap-2 pt-[25svh] text-secondary-foreground">
            {props.children}
        </div>
    );
}
