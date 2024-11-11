import { ReactNode, useContext } from "react";
import { LateralMenuTemplateContext } from "./LateralMenuTemplate";
import NavLink from "@/components/links/NavLink";
import { IconRoot } from "@/app/icons";

export interface LateralMenuLinkProps {
    icon: ReactNode;
    children: string;
    href: string;
}
export default function LateralMenuLink(props: LateralMenuLinkProps) {
    //HOOKS
    const { shrinkedMenu } = useContext(LateralMenuTemplateContext);

    //VARIABLES
    const classNameIfShrinked = shrinkedMenu ? "ps-[0.45rem]" : "";
    const classNameSpanIfShrinked = shrinkedMenu ? "opacity-0" : "opacity-100";

    return (
        <NavLink
            href={props.href}
            className={`${classNameIfShrinked} !justify-start size-full gap-2 p-1 ps-3 pe-3 transition-all duration-200`}
        >
            <div className="flex shrink-0">
                <IconRoot className="fill-foreground" size="sm">
                    {props.icon}
                </IconRoot>
            </div>
            <div className={`transition-[opacity] duration-300 ${classNameSpanIfShrinked}`}> {props.children}</div>
        </NavLink>
    );
}
