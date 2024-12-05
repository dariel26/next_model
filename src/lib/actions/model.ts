"use server";

import { redirect } from "next/navigation";
import prisma from "../prisma/client";
import { createOneModelSchema } from "../schemas/model";
import { ROUTES } from "@/constants/routes";

export async function createOneModel(formData: FormData) {
    const { name, about } = createOneModelSchema.parse({ name: formData.get("name"), about: formData.get("about") });

    await prisma.model.create({ data: { name, about } });
    redirect(ROUTES.modelList);
}
