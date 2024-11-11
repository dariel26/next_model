import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export interface LateralMenuTemplateContextProps {
    shrinkedMenu: boolean;
    setShrinkedMenu: Dispatch<SetStateAction<boolean>>;
}

export const LateralMenuTemplateContext = createContext<LateralMenuTemplateContextProps>({
    setShrinkedMenu: () => false,
    shrinkedMenu: false,
});

export interface LateralMenuTemplateProps {
    children?: ReactNode;
}

export default function LateralMenuTemplate(props: LateralMenuTemplateProps) {
    //HOOKS
    const [shrinkedMenu, setShrinkedMenu] = useState(false);

    //VARIABLES
    const classNameDefaultCols = "grid-cols-[0px_100%] md:grid-cols-[15rem_calc(100%-15rem)]";
    const classNameIfShrinked = shrinkedMenu ? "md:grid-cols-[4rem_calc(100%-4rem)]" : "";

    return (
        <LateralMenuTemplateContext.Provider value={{ setShrinkedMenu, shrinkedMenu }}>
            <section
                className={`grid ${classNameDefaultCols} ${classNameIfShrinked} w-full h-full transition-all duration-300`}
            >
                {props.children}
            </section>
        </LateralMenuTemplateContext.Provider>
    );
}
