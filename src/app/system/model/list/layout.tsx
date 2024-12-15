import ModelLayout from "@/components/layouts/model.layout";
import { ModelListLayoutProps } from "./types";

export default function ModelListLayout(props: ModelListLayoutProps) {
    return <ModelLayout title="Modelos">{props.children}</ModelLayout>;
}
