import { ReactNode } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { cn } from "@/lib/utils/tailwind";

export type HeaderBodyLayoutProps = {
    children?: ReactNode;
    title?: string;
    centered?: boolean;
};

export default function HeaderBodyLayout(props: HeaderBodyLayoutProps) {
    return (
        <section className="grid w-full grid-rows-[3.4rem_calc(100svh-3.4rem)] overflow-hidden">
            <div className="flex size-full">
                <header className="flex size-full items-center border-b px-2">
                    <SidebarTrigger />
                    <h4 className="ms-3 text-2xl">{props.title}</h4>
                </header>
            </div>
            <div className="flex size-full justify-center overflow-auto">
                <div
                    className={cn(
                        "size-full p-4",
                        props.centered && "w-full px-4 sm:w-[90%] md:w-[80%] lg:w-[70%]"
                    )}
                >
                    {props.children}
                </div>
            </div>
        </section>
    );
}
