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

export default function FormNewModel() {
    //VARIABLES
    const formNewModel = useForm<z.infer<typeof createOneModelSchema>>({
        resolver: zodResolver(createOneModelSchema),
        values: { name: "", about: undefined },
    });

    //EVENTS

    return (
        <Form {...formNewModel}>
            <form action={actions.createOneModel} className="space-y-8">
                <FormField
                    control={formNewModel.control}
                    name="name"
                    defaultValue={formNewModel.getValues("name")}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome do modelo</FormLabel>
                            <FormControl>
                                <Input required placeholder="Ex: Vendas, Clientes..." {...field} />
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
                <Button type="submit">Criar</Button>
            </form>
        </Form>
    );
}
