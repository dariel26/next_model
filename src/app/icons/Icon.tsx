"use client";

import { createContext, ReactNode } from "react";

export interface IconContextProps {
    classNameDefault: string;
    className?: string;
}

export const IconContext = createContext<IconContextProps>({ classNameDefault: "", className: "" });

export interface IconProps {
    children?: ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg";
}

export default function Icon(props: IconProps) {
    //VARIABLES
    const classNameDefault = props.size === "sm" ? "h-[1.3rem]" : props.size === "md" ? "h-[1.6rem]" : "h-[1.9rem]";

    return (
        <IconContext.Provider value={{ className: props.className, classNameDefault }}>
            {props.children}
        </IconContext.Provider>
    );
}
