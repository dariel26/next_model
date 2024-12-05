import prisma from "../prisma/client";

export function findManyModels(query?: { search?: string }) {
    return prisma.model.findMany({ where: { name: { contains: query?.search, mode: "insensitive" } } });
}

export function findUniqueModel(id: string) {
    return prisma.model.findUnique({ where: { id } });
}
