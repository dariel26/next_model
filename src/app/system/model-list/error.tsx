"use client";
import { Button } from "@/components/ui/button";
import { ModelListErrorProps } from "./types";

export default function ModelListError(props: ModelListErrorProps) {
    return (
        <section className="flex flex-col">
            <div className="flex w-full">
                Ocorreu um erro ao carregar a lista de modelos. <Button onClick={props.reset}>Tentar novamente!</Button>
            </div>
            <div className="flex w-full">
                <h4>Mensagem do error:</h4>
                <p>{props.error.message}</p>
            </div>
        </section>
    );
}
