import { z } from "zod";

export const createOneModelSchema = z.object({
    name: z.string().max(50, { message: "O nome do modelo deve possuir no máximo 50 caracteres." }),
    about: z.optional(z.string().max(255, { message: "A descrição do modelo deve possuir no máximo 255 caracteres." })),
});
