import NavLink, { NavLinkProps } from "@/components/links/NavLink";
import Badge from "@/components/texts/Badge";
import { ReactNode, useContext } from "react";
import { MenuDefaultContext } from "./MenuDefault";
import { twMerge } from "tailwind-merge";

export interface MenuDefaultLinkProps extends NavLinkProps {
    icon: ReactNode;
    newResource?: boolean;
}

export default function MenuDefaultLink({ icon, newResource, children, className, ...props }: MenuDefaultLinkProps) {
    //CONTEXTS
    const { lateralMenuMode, type } = useContext(MenuDefaultContext);
    return (
        <NavLink
            className={twMerge(
                "transition-width h-[2.3rem] duration-300",
                type === "cols" || lateralMenuMode === "short-view" ? "w-[2.3rem]" : "w-full",
                className
            )}
            {...props}
        >
            <div className="relative flex size-full items-center gap-2 ps-2">
                <div>{icon}</div>
                <div
                    className={twMerge(
                        "font-medium",
                        (type === "cols" || lateralMenuMode === "short-view") && "hidden"
                    )}
                >
                    {children}
                </div>
                <Badge className={twMerge("bg-primary text-[0.58rem]", !newResource && "hidden")}>New</Badge>
            </div>
        </NavLink>
    );
}
