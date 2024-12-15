"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/inputs/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { createOneModelSchema } from "@/lib/schemas/model";
import actions from "@/lib/actions";
import { NewModelFormProps } from "./new-model.form.types";
import AboutForm from "../about.form";
import { useActionState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const createOneModelInitialState = {};
export default function NewModelForm(props: NewModelFormProps) {
    //HOOKS
    const [state, createOneModel, pending] = useActionState<any, FormData>(
        actions.createOneModel,
        createOneModelInitialState
    );

    //VARIABLES
    const formNewModel = useForm<z.infer<typeof createOneModelSchema>>({
        resolver: zodResolver(createOneModelSchema),
        values: { name: "", about: undefined },
    });

    //EVENTS
    useEffect(() => {
        formNewModel.clearErrors(["about", "name"]);
        Object.keys(state).forEach((key: any) => formNewModel.setError(key, { message: state[key] }));
    }, [state]);

    return (
        <Form {...formNewModel}>
            {props.showAbout && (
                <AboutForm title="Crie um Novo Modelo">
                    Os modelos representam e armazenam tudo sobre um tipo específico de dados assim como sua estrutura.
                    Crie modelos como 'Vendas', 'Clientes' ou qualquer outro tipo de dados do seu interesse.
                </AboutForm>
            )}

            <form action={createOneModel} className="flex flex-col justify-end space-y-4">
                <FormField
                    control={formNewModel.control}
                    name="name"
                    defaultValue={formNewModel.getValues("name")}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome do modelo</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Vendas, Clientes..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={formNewModel.control}
                    name="about"
                    defaultValue={formNewModel.getValues("about") ?? ""}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Descreva este modelo..." rows={4} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit">Criar Modelo {pending && <Loader2 className="animate-spin" />}</Button>
                </div>
            </form>
        </Form>
    );
}
