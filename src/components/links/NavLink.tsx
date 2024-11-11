import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import { ReactNode } from "react";

export interface NavLinkProps extends LinkProps {
    className?: string;
    children?: ReactNode;
}

export default function NavLink({ className, children, ...props }: NavLinkProps) {
    //HOOKS
    const currentPath = usePathname();

    //VARIABLES
    const isActive = path.parse(props.href.toString()).base === path.parse(currentPath).base;

    const classNameIfActive = isActive ? "border-neutral-400 bg-background-hover" : "border-transparent";

    return (
        <Link
            {...props}
            className={`${className} ${classNameIfActive} flex items-center justify-center border border-2 bg-background hover:bg-background-hover active:bg-background-active rounded-md`}
        >
            {children}
        </Link>
    );
}
