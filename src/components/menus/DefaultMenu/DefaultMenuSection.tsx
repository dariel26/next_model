import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface MenuSectionContextProps {
    shrinkedMenu: boolean;
    setShrinkedMenu: Dispatch<SetStateAction<boolean>>;
}

export const MenuSectionContext = createContext<MenuSectionContextProps>({
    setShrinkedMenu: () => false,
    shrinkedMenu: false,
});

export interface DefaultMenuSectionProps {
    children?: ReactNode;
}

export default function DefaultMenuSection(props: DefaultMenuSectionProps) {
    //HOOKS
    const [shrinkedMenu, setShrinkedMenu] = useState(false);

    //VARIABLES
    const classNameIfShrinked = shrinkedMenu
        ? "md:grid-cols-[4rem_calc(100%-4rem)]"
        : "md:grid-cols-[15rem_calc(100%-15rem)]";

    return (
        <MenuSectionContext.Provider value={{ setShrinkedMenu, shrinkedMenu }}>
            <section
                className={`grid grid-cols-[0px_100%] ${classNameIfShrinked} w-full h-full transition-all duration-300`}
            >
                {props.children}
            </section>
        </MenuSectionContext.Provider>
    );
}
