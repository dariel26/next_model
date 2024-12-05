import { z } from "zod";

export const ACCEPTED_SPREADSHEET_FILES = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
export const createOneCollectionBySpreadsheetsSchema = z.object({
    files: z
        .unknown()
        .transform((value) => value as FileList)
        .refine((list) => list.length > 0, "No files selected")
        .transform((list) => Array.from(list))
        .refine(
            (files) => {
                return files.every((file) => ACCEPTED_SPREADSHEET_FILES.includes(file.type));
            },
            { message: "Tipo de arquivo inválido. Tipos válidos: xlsx." }
        ),
});
