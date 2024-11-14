import { ReactNode } from "react";
import MenuDefault from "../menus/MenuDefault/MenuDefault";
import MenuDefaultLink from "../menus/MenuDefault/MenuDefaultLink";
import { HomeIcon, ScheduleIcon, TableIcon } from "@/app/icons";
import MenuDefaultGrid from "../menus/MenuDefault/MenuDefaultGrid";
import HeaderDefault from "../headers/HeaderDefault";

export interface LayoutSystemMenuProps {
    children?: ReactNode;
}

export default function LayoutSystemMenu(props: LayoutSystemMenuProps) {
    return (
        <section className="grid w-svw grid-rows-[3rem_calc(100svh-3rem)] font-sans">
            <HeaderDefault />
            <MenuDefaultGrid>
                <MenuDefault>
                    <MenuDefaultLink href={"./home"} icon={<HomeIcon className="size-icon-sm" />}>
                        Home
                    </MenuDefaultLink>
                    <MenuDefaultLink href={"./agenda"} icon={<ScheduleIcon className="size-icon-sm" />}>
                        Agenda
                    </MenuDefaultLink>
                    <MenuDefaultLink href={"./tabela"} icon={<TableIcon className="size-icon-sm" />}>
                        Tabela
                    </MenuDefaultLink>
                </MenuDefault>
                {props.children}
            </MenuDefaultGrid>
        </section>
    );
}
