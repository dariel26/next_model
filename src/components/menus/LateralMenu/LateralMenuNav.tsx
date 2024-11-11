import { ReactNode, useCallback, useContext } from "react";
import { LateralMenuTemplateContext } from "./LateralMenuTemplate";
import Button from "@/components/buttons/Button";
import { ColapseLeftIcon } from "@/app/icons";
import IconRoot from "@/app/icons/Icon";

export interface LateralMenuNav {
    children?: ReactNode;
    className?: string;
}

export default function LateralMenuNav(props: LateralMenuNav) {
    //HOOKS
    const { setShrinkedMenu, shrinkedMenu } = useContext(LateralMenuTemplateContext);

    //VARIABLES
    const classNameButtonIfShrinked = shrinkedMenu ? "pe-[1.15rem]" : "";
    const classNameSpanIfShrinked = shrinkedMenu ? "opacity-0 w-0" : "";
    const classNameIconIfShrinked = shrinkedMenu ? "rotate-180" : "";

    //EVENTS
    const handleOnClickCloseOpenMenu = useCallback(() => {
        setShrinkedMenu((current) => !current);
    }, [setShrinkedMenu]);

    return (
        <div className={`${props.className} overflow-hidden`}>
            <div className="flex size-full bg-background  border-r-2 border-neutral-300 overflow-y-auto overflow-x-hidden">
                <div className="flex flex-col size-full justify-between">
                    <nav className={`flex flex-col w-full gap-2 p-3`}>{props.children}</nav>
                    <Button
                        onClick={handleOnClickCloseOpenMenu}
                        className={`${classNameButtonIfShrinked} flex p-3 items-center justify-between h-12 border-t border-neutral-300 transition-all duration-300`}
                        title="Abrir/Fechar Menu"
                        variant="transparent"
                    >
                        <span
                            className={`${classNameSpanIfShrinked} font-bold whitespace-nowrap transition-[opacity] duration-300`}
                        >
                            Fechar Menu
                        </span>
                        <IconRoot
                            className={`${classNameIconIfShrinked} fill-foreground transition-rotate duration-300`}
                            size="md"
                        >
                            <ColapseLeftIcon />
                        </IconRoot>
                    </Button>
                </div>
            </div>
        </div>
    );
}
