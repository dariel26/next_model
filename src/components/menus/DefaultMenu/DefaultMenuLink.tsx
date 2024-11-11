import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import { ReactNode, useContext } from "react";
import { MenuSectionContext } from "./DefaultMenuSection";

export interface DefaultMenuLinkProps extends LinkProps {
    className?: string;
    icon: ReactNode;
    children: string;
}
export default function DefaultMenuLink(props: DefaultMenuLinkProps) {
    //HOOKS
    const currentPath = usePathname();
    const { shrinkedMenu } = useContext(MenuSectionContext);

    //VARIABLES
    const isActive = path.parse(props.href.toString()).base === path.parse(currentPath).base;

    const classNameIfActive = isActive ? "border-neutral-400 bg-background-hover" : "border-transparent";
    const classNameIfShrinked = shrinkedMenu ? "ps-[0.45rem]" : "";
    const classNameSpanIfShrinked = shrinkedMenu ? "opacity-0" : "opacity-100";

    return (
        <Link
            href={props.href}
            className={`${props.className} ${classNameIfShrinked} ${classNameIfActive} flex gap-2 w-full h-10 border border-2 bg-background hover:bg-background-hover active:bg-background-active items-center ps-3 pe-3 rounded-md transition-all duration-200`}
        >
            <div className="flex shrink-0"> {props.icon}</div>
            <div className={`transition-[opacity] duration-300 ${classNameSpanIfShrinked}`}> {props.children}</div>
        </Link>
    );
}
