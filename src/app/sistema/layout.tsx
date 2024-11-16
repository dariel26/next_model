import { AppSidebar } from "@/components/sidebars/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
                <div className="px-2"> {props.children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
