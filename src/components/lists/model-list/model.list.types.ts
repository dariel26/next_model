import { Model } from "@prisma/client";

export type ModelListProps = { className?: string; models: Model[] };
export type ModelListItemProps = { model: Model };
