import { ReactNode } from "react";
import { generateMetadata } from "./page";
import { Params } from "next/dist/server/request/params";
import ModelLayout from "@/components/layouts/model.layout";

export default async function ModelIdLayout(props: { children: ReactNode; params: Promise<Params> }) {
    const { title } = await generateMetadata({ params: props.params });
    if (typeof title !== "string" && title !== null)
        throw new Error("O título do layout deve ser do tipo string ou nulo.");

    return <ModelLayout title={title}>{props.children}</ModelLayout>;
}
