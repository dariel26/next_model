import { IconRoot, MenuIcon } from "@/app/icons";
import Button from "@/components/buttons/Button";
import { ReactNode } from "react";

export interface BottomMenuNav {
    children?: ReactNode;
    className?: string;
}

export default function BottomMenuNav(props: BottomMenuNav) {
    return (
        <div className={`${props.className} overflow-hidden`}>
            <div className="flex size-full bg-background  border-t-2 border-neutral-300 overflow-hidden">
                <nav className={`grid grid-cols-[2.5rem_2.5rem_2.5rem] size-full justify-around gap-3 p-3`}>
                    {props.children}
                    <Button
                        title="Open Full Menu"
                        className="flex items-center justify-center w-auto rounded-md"
                        variant="transparent"
                    >
                        <IconRoot className="fill-foreground" size="md">
                            <MenuIcon />
                        </IconRoot>
                    </Button>
                </nav>
            </div>
        </div>
    );
}
