import { ColapseLeftIcon, IconRoot, MenuIcon } from "@/app/icons";
import Button from "@/components/buttons/Button";
import React, { createContext, ReactNode, useCallback } from "react";
import { TLateralMenuMode } from "./MenuDefaultGrid";

export type TDefaultMenuType = "rows" | "cols";

export interface MenuDefaultContextProps {
    lateralMenuMode: TLateralMenuMode;
    type: TDefaultMenuType;
}
export const MenuDefaultContext = createContext<MenuDefaultContextProps>({
    lateralMenuMode: "full-view",
    type: "cols",
});

export interface MenuDefaultProps {
    type?: TDefaultMenuType;
    children?: Iterable<ReactNode>;
    lateralMenuMode?: TLateralMenuMode;
    setLateralMenuMode?: React.Dispatch<React.SetStateAction<TLateralMenuMode>>;
    onClickSeeMore?: () => void;
}

export default function MenuDefault({ type, setLateralMenuMode, lateralMenuMode, ...props }: MenuDefaultProps) {
    //VARIABLES
    const lateralMenuModeDefined = lateralMenuMode ?? "full-view";
    const typeMenuDefined = type ?? "cols";

    const collapsedButtonIconMode: Record<TLateralMenuMode, string> = {
        "full-view": "",
        "short-view": "rotate-180",
    };
    const collapsedButtonMode: Record<TLateralMenuMode, string> = {
        "full-view": "w-[5rem]",
        "short-view": "hidden w-[0rem]",
    };
    const menuGridType: Record<TDefaultMenuType, string> = {
        cols: "grid grid-rows-[100%_0rem]",
        rows: "grid grid-rows-[calc(100%-3.4rem)_3.4rem]",
    };
    const navFlexType: Record<TDefaultMenuType, string> = {
        cols: "flex-row overflow-none items-center justify-around",
        rows: "flex-col overflow-x-hidden overflow-y-auto gap-y-2",
    };
    const childrenArr = React.Children.toArray(props.children);
    const filteredChildren = type === "cols" ? childrenArr.slice(0, 3) : childrenArr;

    //EVENTS
    const onClickCollapsedButton = useCallback(() => {
        if (!setLateralMenuMode) return;
        setLateralMenuMode((current) => (current === "full-view" ? "short-view" : "full-view"));
    }, [setLateralMenuMode]);

    return (
        <MenuDefaultContext.Provider value={{ lateralMenuMode: lateralMenuModeDefined, type: typeMenuDefined }}>
            <section className={`${menuGridType[typeMenuDefined]} size-full `}>
                <nav className={`${navFlexType[typeMenuDefined]} flex  size-full p-3`}>
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
                    onClick={onClickCollapsedButton}
                    className={`flex size-full justify-center border-t border-neutral-300 transition-all duration-300 overflow-hidden`}
                    title="Shrink Menu"
                    variant="transparent"
                >
                    <span
                        className={`${collapsedButtonMode[lateralMenuModeDefined]} center me-[3rem] font-bold whitespace-nowrap transition-all duration-300`}
                    >
                        Encolher menu
                    </span>
                    <IconRoot
                        className={`${collapsedButtonIconMode[lateralMenuModeDefined]} fill-foreground transition-rotate duration-300`}
                        size="md"
                    >
                        <ColapseLeftIcon />
                    </IconRoot>
                </Button>
            </section>
        </MenuDefaultContext.Provider>
    );
}
