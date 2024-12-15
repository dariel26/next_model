export enum ModelIdTabValues {
    COLLECTIONS = "collections",
    CONFIG = "configuration",
}

export type ModelIdTabsProps = { modelId: string; activeTab: ModelIdTabValues };
