"use client";

import { Database } from "lucide-react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import routeUtils from "@/lib/utils/routes";
import { NewModelButtonProps } from "./new-model.button.types";

export default function NewModelButton(props: NewModelButtonProps) {
    //HOOKS
    const router = useRouter();

    //EVENTS
    const goToNewModelPage = useCallback(() => router.push(routeUtils.newModel.url), [router]);

    return (
        <Button onClick={goToNewModelPage}>
            {props.children ?? (
                <>
                    Novo <Database />
                </>
            )}
        </Button>
    );
}
