import { createContext, ReactNode } from "react";

export interface IconRootContextProps {
    classNameDefault: string;
    className?: string;
}

export const IconRootContext = createContext<IconRootContextProps>({ classNameDefault: "", className: "" });

export interface IconRootProps {
    children?: ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg";
}

export default function IconRoot(props: IconRootProps) {
    //VARIABLES
    const classNameDefault = props.size === "sm" ? "h-[1.3rem]" : props.size === "md" ? "h-[1.6rem]" : "h-[1.9rem]";

    return (
        <IconRootContext.Provider value={{ className: props.className, classNameDefault }}>
            {props.children}
        </IconRootContext.Provider>
    );
}
