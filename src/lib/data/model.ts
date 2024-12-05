import prisma from "../prisma/client";

export function findManyModels(query?: { search?: string }) {
    return prisma.model.findMany({ where: { name: { contains: query?.search, mode: "insensitive" } } });
}
