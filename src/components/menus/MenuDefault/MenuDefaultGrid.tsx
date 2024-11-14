import React, { ReactElement, ReactNode, useState } from "react";
import { MenuDefaultProps } from "./MenuDefault";

export type TLateralMenuMode = "full-view" | "short-view";

export interface MenuDefaultGridProps {
    children: ReactNode;
}

//TODO: Existe alguma forma de que somente em desenvolvimento avisar ao desenvolvedor que somente pode ser passado exatamente 2 children?
export default function MenuDefaultGrid({ children }: MenuDefaultGridProps) {
    //STATES
    const [lateralMenuMode, setLateralMenuMode] = useState<TLateralMenuMode>("full-view");

    //VARIABLES
    const [menuChild, rigthChild] = React.Children.toArray(children);

    const gridColsMode: Record<TLateralMenuMode, string> = {
        "full-view": "md:grid-cols-[15rem_calc(100%-15rem)]",
        "short-view": "md:grid-cols-[4rem_calc(100%-4rem)]",
    };

    //EVENTS
    const menuChildLeft = React.cloneElement(menuChild as ReactElement<MenuDefaultProps>, {
        type: "rows",
        lateralMenuMode,
        setLateralMenuMode,
    });
    const menuChildBottom = React.cloneElement(menuChild as ReactElement<MenuDefaultProps>, {
        type: "cols",
    });

    return (
        <section
            className={`size-full grid grid-cols-[0rem_100%] ${gridColsMode[lateralMenuMode]} bg-background transition-width duration-300`}
        >
            <div className="flex size-full border-r-2 border-neutral-300 opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto transition-opacity duration-300">
                <div className="size-full hidden md:flex">{menuChildLeft}</div>
            </div>
            <div className="size-full grid grid-rows-[calc(100%-3.4rem)_3.4rem] md:grid-rows-[100%_0px]">
                {rigthChild}
                <div className="flex size-full border-t-2 border-neutral-300 opacity-100  md:opacity-0 pointer-events-auto md:pointer-events-none transition-opacity duration-300">
                    {menuChildBottom}
                </div>
            </div>
        </section>
    );
}
