import NewModelButton from "@/components/buttons/new-model/new-model";
import SearchInput from "@/components/inputs/search/search";
import ModelListItem from "@/components/lists/models/model-item";
import ModelList from "@/components/lists/models/model-list";
import ModalNewModel from "@/components/modals/model/new-model";
import { Button } from "@/components/ui/button";
import Text from "@/components/ui/text";
import { findManyModels } from "@/lib/data/model";
import { ModelsPageProps } from "./types";

export default async function ModelsPage(props: ModelsPageProps) {
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
