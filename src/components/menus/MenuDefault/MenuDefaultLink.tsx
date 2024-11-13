import { IconRoot } from "@/app/icons";
import NavLink, { NavLinkProps } from "@/components/links/NavLink";
import Badge from "@/components/texts/Badge";
import { ReactNode, useContext } from "react";
import { MenuDefaultContext } from "./MenuDefault";

export interface MenuDefaultLinkProps extends NavLinkProps {
    icon: ReactNode;
    newResource?: boolean;
}

export default function MenuDefaultLink({ icon, newResource, children, ...props }: MenuDefaultLinkProps) {
    //CONTEXTS
    const { type } = useContext(MenuDefaultContext);

    //VARIABLES
    const classSizeNavLink = type !== "rows" ? "w-[2.5rem]" : "w-full";
    const classHideText = type !== "rows" ? "opacity-0 pointer-events-none" : "";
    const classHideNewBadge = !newResource ? "hidden" : "";

    return (
        <NavLink className={`h-[2.3rem] ${classSizeNavLink} transition-width duration-300`} {...props}>
            <div className="flex size-full items-center gap-2 ps-2 relative">
                <div>
                    <IconRoot size="sm" className="fill-foreground">
                        {icon}
                    </IconRoot>
                </div>
                <div className={`${classHideText} transition-opacity duration-300`}>{children}</div>
                <Badge className={classHideNewBadge} size="sm">
                    New
                </Badge>
            </div>
        </NavLink>
    );
}
