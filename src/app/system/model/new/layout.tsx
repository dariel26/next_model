import ModelLayout from "@/components/layouts/model.layout";
import { ModelNewLayoutProps } from "./types";

export default async function ModelNewLayout(props: ModelNewLayoutProps) {
    return <ModelLayout title={"Novo Modelo"}>{props.children}</ModelLayout>;
}
