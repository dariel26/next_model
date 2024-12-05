const system = "/system";

const home = "/home";

const modelList = "/model-list";
const model = "/model";
const newCollectionSpreadSheet = "/new-collection-spreadsheet";

export const ROUTES = {
    system,
    modelList: system + modelList,
    model: (modelId: string) => system + model + `/${modelId}`,
    home: system + home,
    newCollectionSpreadSheet: (modelId: string) => system + model + `/${modelId}` + newCollectionSpreadSheet,
};
