import data from "@/lib/data";
import { ModelPageProps } from "./types";
import ModelBreadcrumb from "@/components/breadcrumbs/model";
import SearchInput from "@/components/inputs/search/search";
import HeaderBodyLayout from "@/components/layouts/header-body.layout";
import NewCollectionDropdown from "@/components/dropdowns/collection/new-collection";

export default async function ModelPage(props: ModelPageProps) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const modelId = params.id;
    if (typeof modelId !== "string") throw new Error("Parâmetros incorretos!");

    const model = await data.findUniqueModel(modelId);
    if (!model) throw new Error("Modelo não encontrado!");

    const collections = await data.findManyCollections({ search: searchParams?.search, modelId });

    return (
        <HeaderBodyLayout bodyClassName="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] px-4" title={model.name}>
            <section className="flex size-full flex-col gap-2">
                <ModelBreadcrumb modelName={model.name} />
                <div className="grid grid-cols-[calc(100%-8rem)_7.4rem] justify-between">
                    <SearchInput placeholder="Encontre uma coleção..." />
                    <NewCollectionDropdown />
                </div>
                <ul>
                    {collections.map((collection) => (
                        <li key={collection.id}>{collection.name}</li>
                    ))}
                </ul>
            </section>
        </HeaderBodyLayout>
    );
}
