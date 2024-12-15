"use server";

import { redirect } from "next/navigation";
import prisma from "../prisma/client";
import { createOneModelSchema } from "../schemas/model";
import routeUtils from "../utils/routes";

export async function createOneModel(_: any, upcomingData: FormData) {
    const objectData = Object.fromEntries(upcomingData);
    const { data, error } = await createOneModelSchema.safeParseAsync(objectData);

    if (error) return error.flatten().fieldErrors;
    if (!data) throw new Error("Nenhum dado foi encontrado.");

    await prisma.model.create({ data });
    redirect(routeUtils.modelList.url);
}
