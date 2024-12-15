import { z } from "zod";

export const createOneModelSchema = z.object({
    name: z.string().min(1, "Este campo é requerido.").max(50, { message: "Máximo de 50 caracteres." }).trim(),
    about: z.optional(
        z.string().max(255, { message: "A descrição do modelo deve possuir no máximo 255 caracteres." }).trim()
    ),
});
