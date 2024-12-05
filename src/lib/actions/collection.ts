"use server";

import { redirect } from "next/navigation";
import { findUniqueModel } from "../data/model";
import prisma from "../prisma/client";
import { createOneCollectionBySpreadsheetsSchema } from "../schemas/collection";
import xlsxUtils from "../utils/xlsx";
import { ROUTES } from "@/constants/routes";

export async function createOneCollectionBySpreadsheets(modelId: string, formData: FormData) {
    const { files } = createOneCollectionBySpreadsheetsSchema.parse({
        files: formData.getAll("files"),
    });

    const filesJsonData = [];
    for (const file of files) {
        const xlxsArrBuffer = await file.arrayBuffer();
        filesJsonData.push(...xlsxUtils.xlsxBufferToJson<any>(xlxsArrBuffer));
    }

    const model = await findUniqueModel(modelId);
    if (!model) throw new Error("Modelo não encontrado!");

    await prisma.collection.create({ data: { name: "Nova Coleção", data: filesJsonData, modelId } });
    redirect(ROUTES.modelList);
}
