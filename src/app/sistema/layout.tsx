import { ButtonImage, DefaultMenuSection, DefaultMenuNav, HeaderTitle, DefaultMenuLink } from "@/components";
import { HomeIcon, ScheduleIcon } from "../icons";
import Icon from "../icons/Icon";

const NOME_DA_CLINICA = "EvoClínica";

export default function LayoutSistema() {
    return (
        <section className="grid grid-rows-system-root w-svw font-sans">
            <header className="inline-flex shrink-0 w-full h-full bg-dark p-1 ps-2 pe-2 content-center bg-primary justify-between">
                <div className="inline-flex gap-2">
                    <ButtonImage
                        className="h-full aspect-square"
                        title={NOME_DA_CLINICA}
                        alt="business-icon"
                        src="/icon.jpeg"
                        rounded="rounded-lg"
                    />
                    <HeaderTitle className="self-center">{NOME_DA_CLINICA}</HeaderTitle>
                </div>
                <ButtonImage
                    className="h-full aspect-square"
                    title="Menu do Usuário"
                    alt="user-icon"
                    src="/user.jpg"
                    rounded="rounded-full"
                />
            </header>
            <DefaultMenuSection>
                <DefaultMenuNav className="size-full">
                    <DefaultMenuLink
                        href="./home"
                        icon={
                            <Icon className="fill-foreground" size="sm">
                                <HomeIcon />
                            </Icon>
                        }
                    >
                        Home
                    </DefaultMenuLink>
                    <DefaultMenuLink
                        href="./agenda"
                        icon={
                            <Icon className="fill-foreground" size="sm">
                                <ScheduleIcon />
                            </Icon>
                        }
                    >
                        Agenda
                    </DefaultMenuLink>
                </DefaultMenuNav>
            </DefaultMenuSection>
        </section>
    );
}
