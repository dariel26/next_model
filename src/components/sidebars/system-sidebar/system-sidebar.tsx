"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import SYSTEM_ABOUT from "@/constants/system-about";
import Image from "next/image";
import Link from "next/link";
import { NavUser } from "../../navs/nav-user";
import { NavTheme } from "../../navs/nav-theme";
import { SidebarItem } from "./system-sidebar.types";
import { Database } from "lucide-react";
import routeUtils from "@/lib/utils/routes";

export const sidebarItems: SidebarItem[] = [{ title: "Modelos", url: routeUtils.modelList.url, icon: Database }];

export function SystemSidebar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href={sidebarItems[0].url ?? "."}>
                                <Image
                                    src="/icon.jpeg"
                                    alt="next"
                                    width={192}
                                    height={192}
                                    className="size-8 rounded-md"
                                />
                                <div className="flex flex-col gap-0.5 overflow-hidden leading-none group-data-[collapsible=icon]:hidden">
                                    <span className="font-semibold">{SYSTEM_ABOUT.TITLE}</span>
                                    <span>{SYSTEM_ABOUT.VERSION}</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>System</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {sidebarItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavTheme />
                <NavUser user={{ name: "Usuário A", email: "usuarioA@example.com", avatar: "/user.jpg" }} />
            </SidebarFooter>
        </Sidebar>
    );
}
