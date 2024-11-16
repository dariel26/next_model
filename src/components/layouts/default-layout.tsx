import { ReactNode } from "react";
import { SidebarTrigger } from "../ui/sidebar";

export type DefaultLayoutProps = { children?: ReactNode; title?: string };

export default function DefaultLayout(props: DefaultLayoutProps) {
    return (
        <section className="grid w-full grid-rows-[3.4rem_calc(100svh-3.4rem)]">
            <header className="flex items-center">
                <SidebarTrigger />
                <h4 className="ms-3 text-2xl">{props.title}</h4>
            </header>
            <div className="size-full py-2">{props.children}</div>
        </section>
    );
}
