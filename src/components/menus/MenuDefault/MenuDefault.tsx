import { ColapseLeftIcon, IconRoot, MenuIcon } from "@/app/icons";
import Button from "@/components/buttons/Button";
import React, { createContext, ReactNode } from "react";

export type TDefaultMenuType = "rows" | "cols" | "short-rows";

export interface MenuDefaultContextProps {
    type: TDefaultMenuType;
}
export const MenuDefaultContext = createContext<MenuDefaultContextProps>({
    type: "rows",
});

export interface MenuDefaultProps {
    type: TDefaultMenuType;
    className?: string;
    children?: Iterable<ReactNode>;
    onClickShrink?: () => void;
    onClickSeeMore?: () => void;
}

export default function MenuDefault({ type, ...props }: MenuDefaultProps) {
    //VARIABLES
    const childrenArr = React.Children.toArray(props.children);
    const filteredChildren = type === "cols" ? childrenArr.slice(0, 3) : childrenArr;

    const classHideTextButton = type === "short-rows" ? "opacity-0 pointer-events-none" : "";
    const classSizeButton = type === "short-rows" ? "grid-cols-[0rem_2rem]" : "grid-cols-[10rem_5rem]";
    const classRotateIconButton = type === "short-rows" ? "rotate-180" : "";
    const classHideShrinkButton = type === "cols" ? "hidden" : "";

    const classMenuRows = type !== "cols" ? "grid-rows-[calc(100%-3.4rem)_3.4rem] border-r-2" : "";
    const classMenuCols = type === "cols" ? "border-t-2" : "";

    const classNavDirection = type !== "cols" ? "flex-col" : "";
    const classNavOverflow = type === "cols" ? "!overflow-hidden" : "";
    const classNavItems = type === "cols" ? "justify-around items-center" : "";

    return (
        <MenuDefaultContext.Provider value={{ type }}>
            <section className={`${props.className} flex size-full`}>
                <div className={`grid size-full ${classMenuRows} ${classMenuCols} border-neutral-300`}>
                    <nav
                        className={`flex ${classNavDirection} ${classNavOverflow} ${classNavItems} size-full overflow-x-hidden overflow-y-auto p-3 gap-y-2`}
                    >
                        {filteredChildren}
                        {type === "cols" && childrenArr.length > 3 && (
                            <Button
                                onClick={props.onClickSeeMore}
                                title="Open Menu"
                                variant="transparent"
                                className="h-100 rounded-md"
                            >
                                <IconRoot className="size-full fill-foreground" size="md">
                                    <MenuIcon />
                                </IconRoot>
                            </Button>
                        )}
                    </nav>
                    <Button
                        onClick={props.onClickShrink}
                        className={`${classHideShrinkButton} ${classSizeButton} p-0 grid size-full justify-center border-t border-neutral-300 transition-all duration-300`}
                        title="Shrink Menu"
                        variant="transparent"
                    >
                        <span
                            className={`${classHideTextButton} shrink center font-bold whitespace-nowrap transition-all duration-300`}
                        >
                            Encolher menu
                        </span>
                        <IconRoot
                            className={`${classRotateIconButton} size-full fill-foreground transition-rotate duration-300`}
                            size="md"
                        >
                            <ColapseLeftIcon />
                        </IconRoot>
                    </Button>
                </div>
            </section>
        </MenuDefaultContext.Provider>
    );
}
