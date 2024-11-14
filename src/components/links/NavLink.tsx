import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface NavLinkProps extends LinkProps {
    className?: string;
    children?: ReactNode;
}

export default function NavLink({ className, children, ...props }: NavLinkProps) {
    //HOOKS
    const currentPath = usePathname();

    //VARIABLES
    const isActive = path.parse(props.href.toString()).base === path.parse(currentPath).base;

    return (
        <Link
            {...props}
            className={twMerge(
                "flex items-center justify-center rounded-md bg-background hover:bg-background-hover active:bg-background-active",
                isActive ? "border-neutral-400 bg-background-hover" : "border-transparent",
                className
            )}
        >
            {children}
        </Link>
    );
}
