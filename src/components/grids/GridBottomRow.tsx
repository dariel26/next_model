import { TBreakPoint } from "@/types/tailwind";
import { ReactNode } from "react";

export interface GridBottomRowProps {
    height: string;
    breakPointToHide: TBreakPoint;
    animated?: boolean;
    children?: ReactNode;
}

export default function GridBottomRow({ height, breakPointToHide, animated, ...props }: GridBottomRowProps) {
    //VARIABLES
    const classWidth = `grid-rows-[calc(100%-${height})_${height}] ${breakPointToHide}:grid-rows-[100%_0px]`;
    const classAnimated = animated ? "transition-all duration-300" : "";

    return <section className={`grid ${classWidth} size-full ${classAnimated}`}>{props.children}</section>;
}
