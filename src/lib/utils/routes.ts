export const system = "/system";
export const model = "/model";
export const modelList = "/list";
export const newModel = "/new";
export const configModel = "/config";

const routeUtils = {
    modelList: { url: system + model + modelList, name: "Modelos" },

    modelId: (id: string) => system + model + `/${id}`,

    configModelId: (id: string) => system + model + `/${id}` + configModel,

    newModel: { url: system + model + newModel, name: "Novo Modelo" },
};

export default routeUtils;
