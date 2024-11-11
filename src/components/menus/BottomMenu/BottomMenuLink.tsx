import { IconRoot } from "@/app/icons";
import NavLink from "@/components/links/NavLink";
import { ReactNode } from "react";

export interface BottomMenuLinkProps {
    icon: ReactNode;
    href: string;
}
export default function BottomMenuLink(props: BottomMenuLinkProps) {
    return (
        <NavLink href={props.href} className="size-full">
            <div className="flex shrink-0">
                <IconRoot className="fill-foreground" size="sm">
                    {props.icon}
                </IconRoot>
            </div>
        </NavLink>
    );
}
