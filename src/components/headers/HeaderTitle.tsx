"use client";

import { ReactNode } from "react";

export interface HeaderTitleProps {
    children?: ReactNode;
    className?: string;
}

export default function HeaderTitle(props: HeaderTitleProps) {
    return <h5 className={`${props.className} text-2xl font-bold tracking-wide`}>{props.children}</h5>;
}
