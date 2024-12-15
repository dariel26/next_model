import { findManyModels } from "@/lib/data/model";
import SearchInput from "@/components/inputs/search/search";
import ModelList from "@/components/lists/model-list/model.list";
import NewModelButton from "@/components/buttons/new-model/new-model.button";
import { ModelListPageProps } from "./types";

export default async function ModelListPage(props: ModelListPageProps) {
    //VARIABLES
    const searchParams = await props.searchParams;
    const models = await findManyModels({ search: searchParams?.search });

    return (
        <section className="flex size-full flex-col">
            <div className="w-100 flex justify-end gap-2">
                <SearchInput placeholder="Encontre um modelo..." />
                <NewModelButton />
            </div>
            <ModelList models={models} />
        </section>
    );
}
