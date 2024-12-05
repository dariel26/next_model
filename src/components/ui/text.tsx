import { cn } from "@/lib/utils/tailwind";
import { ReactNode } from "react";

export type TextProps = { children?: ReactNode; secondary?: boolean; small?: boolean };

export default function Text(props: TextProps) {
    return (
        <span className={cn("text-foreground", props.secondary && "text-foreground/50", props.small && "text-sm")}>
            {props.children}
        </span>
    );
}
