import { findManyModels } from "@/lib/data/model";
import { ModelListPageProps } from "./types";
import SearchInput from "@/components/inputs/search/search";
import ModalNewModel from "@/components/dialogs/model/new-model";
import NewModelButton from "@/components/buttons/new-model/new-model";
import ModelList from "@/components/lists/models/model-list";
import ModelListItem from "@/components/lists/models/model-item";
import Text from "@/components/ui/text";
import { Button } from "@/components/ui/button";

export default async function ModelListPage(props: ModelListPageProps) {
    const searchParams = await props.searchParams;
    const models = await findManyModels({ search: searchParams?.search });

    return (
        <section className="flex size-full flex-col gap-2">
            <div className="grid grid-cols-[calc(100%-8.6rem)_8rem] justify-between">
                <SearchInput placeholder="Encontre um modelo..." />
                <ModalNewModel>
                    <NewModelButton />
                </ModalNewModel>
            </div>
            {models.length > 0 && (
                <ModelList>
                    {models.map((model) => (
                        <ModelListItem key={model.id} model={model} />
                    ))}
                </ModelList>
            )}
            {models.length === 0 && (
                <div className="flex w-full flex-col items-center gap-2 pt-12">
                    <Text secondary>Nenhum modelo de dados encontrado.</Text>
                    <ModalNewModel>
                        <Button>Criar</Button>
                    </ModalNewModel>
                </div>
            )}
        </section>
    );
}
