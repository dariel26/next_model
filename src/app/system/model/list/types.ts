import { SEARCH_PARAM_KEY } from "@/components/inputs/search/search";
import { ReactNode } from "react";

export type ModelListLayoutProps = { children?: ReactNode };
export type ModelListPageProps = { searchParams: Promise<{ [SEARCH_PARAM_KEY]?: string }> };
