import data from "@/lib/data";
import { ModelIdPageProps } from "./types";
import CustomerError from "@/lib/error/customer.error";
import SearchInput from "@/components/inputs/search/search";
import { Metadata } from "next";
import NewCollectionDropdown from "@/components/dropdowns/collection/new-collection";
import ModelIdTabs from "@/components/tabs/model-id.tabs";
import { ModelIdTabValues } from "@/components/tabs/model-id.tabs.types";

export async function generateMetadata(props: ModelIdPageProps): Promise<Metadata> {
    const params = await props.params;
    const modelId = params.id;

    if (typeof modelId !== "string") throw new Error("O id passado no 'params.id' não é do tipo string.");

    const model = await data.findUniqueModel(modelId);

    return {
        title: model?.name,
    };
}

export default async function ModelIdPage(props: ModelIdPageProps) {
    const params = await props.params;
    const modelId = params.id;

    if (typeof modelId !== "string") throw new Error("O id passado no 'params.id' não é do tipo string.");

    const model = await data.findUniqueModel(modelId);
    if (!model) throw new CustomerError("O modelo não existe no banco de dados.");

    return (
        <section className="flex w-full flex-col">
            <div className="flex w-full justify-between gap-2 pb-3">
                <ModelIdTabs modelId={model.id} activeTab={ModelIdTabValues.COLLECTIONS} />
                <div className="flex gap-2">
                    <SearchInput placeholder="Encontre uma coleção..." />
                    <NewCollectionDropdown />
                </div>
            </div>
        </section>
    );
}
