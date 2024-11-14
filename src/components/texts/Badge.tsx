import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface BadgeProps {
    children?: ReactNode;
    className?: string;
}

export default function Badge(props: BadgeProps) {
    return (
        <span
            className={twMerge("absolute end-0 top-0 m-1 rounded p-[0.08rem] font-bold leading-none", props.className)}
        >
            {props.children}
        </span>
    );
}
