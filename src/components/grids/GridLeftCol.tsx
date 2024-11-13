import { TBreakPoint } from "@/types/tailwind";
import { ReactNode } from "react";

export interface GridLeftColProps {
    width: string;
    breakPointToAppear: TBreakPoint;
    animated?: boolean;
    children?: ReactNode;
}

export default function GridLeftCol({ width, breakPointToAppear, animated, ...props }: GridLeftColProps) {
    //VARIABLES
    const classWidth = `grid-cols-[0px_100%] ${breakPointToAppear}:grid-cols-[${width}_calc(100%-${width})]`;
    const classAnimated = animated ? "transition-all duration-300" : "";

    return <section className={`grid ${classWidth} size-full ${classAnimated}`}>{props.children}</section>;
}
