import { cn } from "@/lib/utils/tailwind";
import { ModelListProps } from "./types";

export default function ModelList({ className, ...props }: ModelListProps) {
    return <ul className={cn("flex w-full flex-col pb-5", className)}>{props.children}</ul>;
}
