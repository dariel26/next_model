import { SystemSidebar } from "@/components/sidebars/system-sidebar/system-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { SystemLayoutProps } from "./types";

export default async function SystemLayout(props: SystemLayoutProps) {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <SystemSidebar />
            <SidebarInset>{props.children}</SidebarInset>
            {props.modal}
        </SidebarProvider>
    );
}
