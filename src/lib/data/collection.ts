import prisma from "../prisma/client";

export function findManyCollections(query?: { search?: string; modelId?: string }) {
    return prisma.collection.findMany({
        where: { modelId: query?.modelId, name: { contains: query?.search, mode: "insensitive" } },
    });
}
