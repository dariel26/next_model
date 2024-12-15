"use client";

import { ChangeEvent, useCallback } from "react";
import DebouncedInput from "../../ui/inputs/debounced-input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchInputProps } from "./types";
import { Search } from "lucide-react";

export const SEARCH_PARAM_KEY = "search";

export default function SearchInput(props: SearchInputProps) {
    //HOOKS
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    //VARIABLES
    const initialSearch = searchParams.get(SEARCH_PARAM_KEY)?.toString() ?? "";

    //EVENTS
    const updateSearchParams = useCallback(
        (search: string | ChangeEvent<HTMLInputElement>) => {
            if (typeof search !== "string") return;

            const urlSearchParams = new URLSearchParams(searchParams);

            if (search === "") urlSearchParams.delete(SEARCH_PARAM_KEY);
            else urlSearchParams.set(SEARCH_PARAM_KEY, search);

            replace(`${pathname}?${urlSearchParams.toString()}`);
        },
        [searchParams, pathname, replace]
    );

    return (
        <div className="relative flex">
            <DebouncedInput
                className="pe-8"
                initialValue={initialSearch}
                onChange={updateSearchParams}
                placeholder={props.placeholder}
            />
            <Search size={20} className="absolute end-0 me-2 self-center text-secondary-foreground" />
        </div>
    );
}
