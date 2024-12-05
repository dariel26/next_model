import { ReactNode } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { cn } from "@/lib/utils/tailwind";

export type HeaderBodyLayoutProps = {
    children?: ReactNode;
    title?: string;
    headerClassName?: string;
    bodyClassName?: string;
};

export default function HeaderBodyLayout(props: HeaderBodyLayoutProps) {
    return (
        <section className="grid w-full grid-rows-[3.4rem_calc(100svh-3.4rem)]">
            <div className="flex size-full">
                <header className={cn("flex size-full items-center border-b px-2", props.headerClassName)}>
                    <SidebarTrigger />
                    <h4 className="ms-3 text-2xl">{props.title}</h4>
                </header>
            </div>
            <div className="flex size-full justify-center">
                <div className={cn("size-full px-2 py-2", props.bodyClassName)}>{props.children}</div>
            </div>
        </section>
    );
}
