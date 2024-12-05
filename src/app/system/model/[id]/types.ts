import { Params } from "next/dist/server/request/params";
import { SearchParams } from "next/dist/server/request/search-params";

export type ModelPageProps = { params: Promise<Params>; searchParams: Promise<{ search?: string }> };
export type ModelListErrorProps = { error: Error & { digest?: string }; reset: () => void };
