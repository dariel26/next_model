import DropdownTheme from "@/components/dropdowns/dropdown-theme";
import { AppSidebar } from "@/components/sidebars/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { ReactNode } from "react";

export interface SystemLayoutProps {
    children?: ReactNode;
}

export default async function SystemLayout(props: SystemLayoutProps) {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <SidebarInset>
                <div className="relative mt-2 flex items-center justify-between">
                    <SidebarTrigger className="ms-2" />
                    <div className="right-0 mr-2">
                        <DropdownTheme />
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{props.children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
