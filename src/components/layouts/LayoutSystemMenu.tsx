"use client";

import { ReactNode } from "react";
import ButtonImage from "../buttons/ButtonImage";
import SYSTEM_ABOUT from "@/constants/systemAbout";
import HeaderTitle from "../headers/HeaderTitle";
import MenuDefault from "../menus/MenuDefault/MenuDefault";
import MenuDefaultLink from "../menus/MenuDefault/MenuDefaultLink";
import { HomeIcon, ScheduleIcon, TableIcon } from "@/app/icons";
import MenuDefaultGrid from "../menus/MenuDefault/MenuDefaultGrid";

export interface LayoutSystemMenuProps {
    children?: ReactNode;
}

export default function LayoutSystemMenu(props: LayoutSystemMenuProps) {
    return (
        <section className="grid grid-rows-[3rem_calc(100svh-3rem)] w-svw font-sans">
            <header className="inline-flex shrink-0 w-full h-full bg-dark p-1 ps-2 pe-2 content-center bg-primary justify-between">
                <div className="inline-flex gap-2">
                    <ButtonImage
                        className="h-full aspect-square"
                        title={SYSTEM_ABOUT.TITLE}
                        alt="business-icon"
                        src="/icon.jpeg"
                        rounded="rounded-lg"
                    />
                    <HeaderTitle className="self-center">{SYSTEM_ABOUT.TITLE}</HeaderTitle>
                </div>
                <ButtonImage
                    className="h-full aspect-square"
                    title="Menu do Usuário"
                    alt="user-icon"
                    src="/user.jpg"
                    rounded="rounded-full"
                />
            </header>
            <MenuDefaultGrid>
                <MenuDefault>
                    <MenuDefaultLink href={"./home"} icon={<HomeIcon />}>
                        Home
                    </MenuDefaultLink>
                    <MenuDefaultLink href={"./agenda"} icon={<ScheduleIcon />}>
                        Agenda
                    </MenuDefaultLink>
                    <MenuDefaultLink href={"./tabela"} icon={<TableIcon />}>
                        Tabela
                    </MenuDefaultLink>
                </MenuDefault>
                {props.children}
            </MenuDefaultGrid>
        </section>
    );
}
