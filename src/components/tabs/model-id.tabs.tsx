"use client";

import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useCallback } from "react";
import { ModelIdTabsProps, ModelIdTabValues } from "./model-id.tabs.types";
import routeUtils from "@/lib/utils/routes";

export default function ModelIdTabs({ modelId, ...props }: ModelIdTabsProps) {
    //HOOKS
    const router = useRouter();

    //EVENTS
    const goToModelIdConfigPage = useCallback(() => router.push(routeUtils.configModelId(modelId)), [modelId]);

    const goToModelIdPage = useCallback(() => router.push(routeUtils.modelId(modelId)), [modelId]);

    return (
        <Tabs value={props.activeTab} className="flex w-[max-content]">
            <TabsList>
                <TabsTrigger value={ModelIdTabValues.COLLECTIONS} onClick={goToModelIdPage}>
                    Coleções
                </TabsTrigger>
                <TabsTrigger value={ModelIdTabValues.CONFIG} onClick={goToModelIdConfigPage}>
                    Configurações
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
}
