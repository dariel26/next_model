"use client";

import { ReactNode, useCallback, useState } from "react";
import ButtonImage from "../buttons/ButtonImage";
import SYSTEM_ABOUT from "@/constants/systemAbout";
import HeaderTitle from "../headers/HeaderTitle";
import GridLeftCol from "../grids/GridLeftCol";
import MenuDefault, { MenuDefaultProps, TDefaultMenuType } from "../menus/MenuDefault/MenuDefault";
import MenuDefaultLink from "../menus/MenuDefault/MenuDefaultLink";
import { HomeIcon, ScheduleIcon, TableIcon } from "@/app/icons";
import GridBottomRow from "../grids/GridBottomRow";

export interface LayoutSystemMenuProps {
    children?: ReactNode;
}

export default function LayoutSystemMenu(props: LayoutSystemMenuProps) {
    //STATES
    const [partialMenu, setPartialMenu] = useState(false);
    const [showOffcanvasMenu, setShowOffcanvasMenu] = useState(false);

    //VARIABLES
    const menuWidth = partialMenu ? "4rem" : "15rem";
    const typeLateralMenu: TDefaultMenuType = partialMenu ? "short-rows" : "rows";

    //EVENTS
    const handleOnClickShrinkMenu = useCallback(() => {
        setPartialMenu((current) => !current);
    }, []);

    const handleOnClickSeeMore = useCallback(() => {
        setShowOffcanvasMenu(true);
    }, []);

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
            <GridLeftCol width={menuWidth} breakPointToAppear="md" animated>
                <div className="size-full">
                    <LayoutMenu
                        className="hidden md:grid"
                        type={typeLateralMenu}
                        onClickShrink={handleOnClickShrinkMenu}
                    />
                </div>
                <div className="size-full">
                    <GridBottomRow height="3.4rem" breakPointToHide="md" animated>
                        <div className="size-full">{props.children}</div>
                        <div className="size-full">
                            <LayoutMenu className="grid md:hidden" type="cols" onClickSeeMore={handleOnClickSeeMore} />
                        </div>
                    </GridBottomRow>
                </div>
            </GridLeftCol>
        </section>
    );
}

function LayoutMenu(props: MenuDefaultProps) {
    return (
        <MenuDefault {...props}>
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
    );
}
