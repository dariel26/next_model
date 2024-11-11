import {
    BottomMenuLink,
    BottomMenuTemplate,
    ButtonImage,
    HeaderTitle,
    LateralMenuLink,
    LateralMenuTemplate,
    BottomMenuNav,
    LateralMenuNav,
} from "@/components";
import SYSTEM_ABOUT from "@/constants/systemAbout";
import { ReactNode } from "react";
import { HomeIcon, ScheduleIcon } from "../icons";

export interface SystemLayoutProps {
    children?: ReactNode;
}

export default function SystemLayout(props: SystemLayoutProps) {
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
            <LateralMenuTemplate>
                <LateralMenuNav className="size-full">
                    <LateralMenuLink href="./home" icon={<HomeIcon />}>
                        Home
                    </LateralMenuLink>
                    <LateralMenuLink href="./agenda" icon={<ScheduleIcon />}>
                        Agenda
                    </LateralMenuLink>
                </LateralMenuNav>
                <BottomMenuTemplate>
                    {props.children}
                    <BottomMenuNav className="size-full">
                        <BottomMenuLink href={"./home"} icon={<HomeIcon />} />
                        <BottomMenuLink href={"./agenda"} icon={<ScheduleIcon />} />
                    </BottomMenuNav>
                </BottomMenuTemplate>
            </LateralMenuTemplate>
        </section>
    );
}
