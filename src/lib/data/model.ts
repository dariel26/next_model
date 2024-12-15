import { Model } from "@prisma/client";
import prisma from "../prisma/client";

const dataDelay = () => new Promise<void>((resolve) => setTimeout(() => resolve(), 2000));

export async function findManyModels(query?: { search?: string }): Promise<Model[]> {
    await dataDelay();
    return prisma.model.findMany({ where: { name: { contains: query?.search, mode: "insensitive" } } });
}

export async function findUniqueModel(id: string): Promise<Model | null> {
    await dataDelay();
    return prisma.model.findUnique({ where: { id } });
}
