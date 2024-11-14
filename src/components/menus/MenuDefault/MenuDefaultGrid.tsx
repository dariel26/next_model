import React, { ReactElement, ReactNode, useState } from "react";
import { MenuDefaultProps } from "./MenuDefault";
import { twMerge } from "tailwind-merge";
import Offcanvas from "@/components/offcanvas/Offcanvas";

export type TLateralMenuMode = "full-view" | "short-view";

export interface MenuDefaultGridProps {
    children: ReactNode;
}

//TODO: Existe alguma forma de que somente em desenvolvimento avisar ao desenvolvedor que somente pode ser passado exatamente 2 children?
export default function MenuDefaultGrid({ children }: MenuDefaultGridProps) {
    //STATES
    const [lateralMenuMode, setLateralMenuMode] = useState<TLateralMenuMode>("full-view");
    const [showOffcanvasMenu, setShowOffcanvasMenu] = useState(false);

    console.log(showOffcanvasMenu);

    //VARIABLES
    const [menuChild, rigthChild] = React.Children.toArray(children);

    const gridColsMode: Record<TLateralMenuMode, string> = {
        "full-view": "md:grid-cols-[15rem_calc(100%-15rem)_0rem]",
        "short-view": "md:grid-cols-[4rem_calc(100%-4rem)_0rem]",
    };

    const menuChildOffcanvas = React.cloneElement(menuChild as ReactElement<MenuDefaultProps>, {
        type: "rows",
    });
    const menuChildLeft = React.cloneElement(menuChild as ReactElement<MenuDefaultProps>, {
        type: "rows",
        lateralMenuMode,
        setLateralMenuMode,
    });
    const menuChildBottom = React.cloneElement(menuChild as ReactElement<MenuDefaultProps>, {
        type: "cols",
        onClickSeeMore: () => setShowOffcanvasMenu(true),
    });

    return (
        <>
            <section
                className={twMerge(
                    "transition-width grid size-full grid-cols-[0rem_100%_0rem] bg-background duration-300",
                    gridColsMode[lateralMenuMode]
                )}
            >
                <div className="pointer-events-none flex size-full border-r-2 border-neutral-300 opacity-0 transition-opacity duration-300 md:pointer-events-auto md:opacity-100">
                    <div className="hidden size-full md:flex">{menuChildLeft}</div>
                </div>
                <div className="grid size-full grid-rows-[calc(100%-3.4rem)_3.4rem] md:grid-rows-[100%_0px]">
                    {rigthChild}
                    <div className="pointer-events-auto flex size-full border-t-2 border-neutral-300 opacity-100 transition-opacity duration-300 md:pointer-events-none md:hidden md:overflow-hidden md:opacity-0">
                        {menuChildBottom}
                    </div>
                </div>
                <Offcanvas
                    className="w-[15rem]"
                    placement="left"
                    show={showOffcanvasMenu}
                    onHide={() => setShowOffcanvasMenu(false)}
                >
                    {menuChildOffcanvas}
                </Offcanvas>
            </section>
        </>
    );
}
