import HeaderBodyLayout from "@/components/layouts/header-body.layout";
import { ReactNode } from "react";

export type TableLayoutProps = {
    children?: ReactNode;
};

export default async function TableLayout(props: TableLayoutProps) {
    return (
        <HeaderBodyLayout bodyClassName="w-full sm:w-[90%] md:w-[80%] lg:w-[70%]" title="Modelos">
            {props.children}
        </HeaderBodyLayout>
    );
}
