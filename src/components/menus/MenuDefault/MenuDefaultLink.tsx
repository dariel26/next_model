import { IconRoot } from "@/app/icons";
import NavLink, { NavLinkProps } from "@/components/links/NavLink";
import Badge from "@/components/texts/Badge";
import { ReactNode, useContext } from "react";
import { MenuDefaultContext, TDefaultMenuType } from "./MenuDefault";
import { TLateralMenuMode } from "./MenuDefaultGrid";

export interface MenuDefaultLinkProps extends NavLinkProps {
    icon: ReactNode;
    newResource?: boolean;
}

export default function MenuDefaultLink({ icon, newResource, children, ...props }: MenuDefaultLinkProps) {
    //CONTEXTS
    const { lateralMenuMode, type } = useContext(MenuDefaultContext);

    //VARIABLES
    const linkWidthType: Record<TDefaultMenuType, string> = {
        cols: "!w-[2.5rem]",
        rows: "w-full",
    };
    const linkWidthMode: Record<TLateralMenuMode, string> = {
        "full-view": "w-full",
        "short-view": "w-[2.5rem]",
    };
    const textOpacityType: Record<TDefaultMenuType, string> = {
        cols: "opacity-0 pointer-events-none",
        rows: "",
    };
    const textOpacityMode: Record<TLateralMenuMode, string> = {
        "full-view": "",
        "short-view": "opacity-0 pointer-events-none",
    };

    return (
        <NavLink
            className={`h-[2.3rem] ${linkWidthMode[lateralMenuMode]} ${linkWidthType[type]} transition-width duration-300`}
            {...props}
        >
            <div className="flex size-full items-center gap-2 ps-2 relative">
                <div>
                    <IconRoot size="sm" className="fill-foreground">
                        {icon}
                    </IconRoot>
                </div>
                <div
                    className={`${textOpacityMode[lateralMenuMode]} ${textOpacityType[type]} transition-opacity duration-300`}
                >
                    {children}
                </div>
                <Badge className={newResource ? "" : "hidden"} size="sm">
                    New
                </Badge>
            </div>
        </NavLink>
    );
}
