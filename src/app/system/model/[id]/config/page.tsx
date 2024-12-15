import ModelIdTabs from "@/components/tabs/model-id.tabs";
import { ConfigModelIdPageProps } from "./types";
import data from "@/lib/data";
import CustomerError from "@/lib/error/customer.error";
import { ModelIdTabValues } from "@/components/tabs/model-id.tabs.types";

export default async function ConfigModelIdPage(props: ConfigModelIdPageProps) {
    const params = await props.params;
    const modelId = params.id;

    if (typeof modelId !== "string") throw new Error("O id passado no 'params.id' não é do tipo string.");

    const model = await data.findUniqueModel(modelId);
    if (!model) throw new CustomerError("O modelo não existe no banco de dados.");

    return (
        <section className="flex size-full flex-col">
            <ModelIdTabs modelId={model.id} activeTab={ModelIdTabValues.CONFIG} />
            Configurações do modelo.
        </section>
    );
}
