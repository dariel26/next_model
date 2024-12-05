import { Model } from "@prisma/client";
import { ReactNode } from "react";

export type ModelListProps = { className?: string; children?: ReactNode };
export type ModelListItemProps = { model: Model };
