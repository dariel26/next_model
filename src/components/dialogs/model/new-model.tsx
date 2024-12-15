"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ModalNewModelProps } from "./types";
import NewModelForm from "@/components/forms/new-model/new-model.form";

export default function ModalNewModel(props: ModalNewModelProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{props.children}</DialogTrigger>
            <DialogContent className="!w-[95svw]">
                <DialogHeader className="border-b pb-2">
                    <DialogTitle>Novo Modelo de Dados</DialogTitle>
                    <DialogDescription>
                        Crie modelos para definir estrutura e organização dos dados no seu sistema.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex size-full flex-col p-2">
                    <NewModelForm />
                </div>
            </DialogContent>
        </Dialog>
    );
}
