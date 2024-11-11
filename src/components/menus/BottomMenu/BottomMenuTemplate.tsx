import { ReactNode } from "react";

export interface BottomMenuTemplateProps {
    children?: ReactNode;
}

export default function BottomMenuTemplate(props: BottomMenuTemplateProps) {
    //VARIABLES
    const classNameDefaultRows = "grid-rows-[calc(100%-4rem)_4rem] md:grid-rows-[100%_0rem]";

    return (
        <section className={`grid ${classNameDefaultRows} size-full transition-all duration-300`}>
            {props.children}
        </section>
    );
}
