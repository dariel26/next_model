"use client";

import { Button } from "../../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { BookMarked, Sheet } from "lucide-react";
import { NewCollectionDropdownProps } from "./types";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function NewCollectionDropdown({ ...props }: NewCollectionDropdownProps) {
    //HOOKS
    const router = useRouter();
    const params = useParams();
    const modelId = params.id;

    //EVENTS
    const goToSpreadsheetModalPage = useCallback(() => {
        if (typeof modelId !== "string") return;
    }, [modelId]);

    return (
        <DropdownMenu {...props}>
            <DropdownMenuTrigger asChild>
                <Button>
                    Criar <BookMarked />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Formas de importação</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={goToSpreadsheetModalPage}>
                    <Sheet /> Planilha
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
