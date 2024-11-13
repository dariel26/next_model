import { ReactNode } from "react";

export interface BadgeProps {
    size?: "sm" | "md";
    variant?: "primary" | "transparent";
    children?: ReactNode;
    className?: string;
}

export default function Badge(props: BadgeProps) {
    //VARIABLES
    const classSize = props.size ?? "md";
    const classVariant = props.variant ?? "primary";

    return (
        <span
            className={`${props.className} absolute leading-none p-[0.08rem] bg-${classVariant} rounded text-${classSize} font-bold end-0 top-0 m-1`}
        >
            {props.children}
        </span>
    );
}
