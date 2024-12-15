import { SidebarTrigger } from "../ui/sidebar";
import { ModelLayoutProps } from "./model.layout.types";

export default function ModelLayout(props: ModelLayoutProps) {
    return (
        <section className="grid grid-rows-[3.4rem_calc(100svh-3.4rem)]">
            <div className="flex size-full items-center gap-2 overflow-hidden border-b px-3">
                <div className="flex w-max shrink-0">
                    <SidebarTrigger />
                </div>
                <div className="flex w-full overflow-hidden">
                    <div className="truncate text-lg">{props.title}</div>
                </div>
            </div>
            <div className="flex size-full justify-center overflow-auto">
                <div className="flex size-full w-full p-3 sm:w-[90%] md:w-[80%] lg:w-[70%]">{props.children}</div>
            </div>
        </section>
    );
}
