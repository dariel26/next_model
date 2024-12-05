import HeaderBodyLayout from "@/components/layouts/header-body.layout";
import { ModelListLayoutProps } from "./types";

export default async function ModelListLayout(props: ModelListLayoutProps) {
    return (
        <HeaderBodyLayout bodyClassName="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] px-4" title="Modelos">
            {props.children}
        </HeaderBodyLayout>
    );
}
