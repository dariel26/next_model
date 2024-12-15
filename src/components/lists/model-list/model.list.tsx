import { cn } from "@/lib/utils/tailwind";
import { ModelListProps } from "./model.list.types";
import ModelItemList from "./model-item.list";
import NewModelButton from "@/components/buttons/new-model/new-model.button";
import NoContentList from "../no-content.list";

export default function ModelList({ className, ...props }: ModelListProps) {
    return (
        <ul className={cn("flex w-full flex-col", className)}>
            {props.models.length > 0 ? (
                props.models.map((model) => <ModelItemList model={model} key={model.id} />)
            ) : (
                <NoContentList>
                    <NewModelButton> Criar Modelo </NewModelButton>
                    <span>Parece que não existe nenhum modelo de dados.</span>
                </NoContentList>
            )}
        </ul>
    );
}
