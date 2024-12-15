import * as XLSX from "xlsx";

function fileListToJsonArray(fileList: FileList): any[] {
    const fileArray = Array.from(fileList);
    const jsonArray = [];

    for (const file of fileArray) {
        const workbook = XLSX.read(file);
        const sheetNameArray = workbook.SheetNames;
        for (const sheetName of sheetNameArray) {
            const newJsonArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: undefined });
            jsonArray.push(...newJsonArray);
        }
    }

    return jsonArray;
}

const xlsxUtils = {
    xlsxBufferToJson<T>(data: ArrayBuffer): T[] {
        const dadosTransformados = [];
        const workbook = XLSX.read(data);
        for (const nomeDaPagina of workbook.SheetNames) {
            const dadosJSON = XLSX.utils.sheet_to_json<T>(workbook.Sheets[nomeDaPagina], { defval: "" });
            dadosTransformados.push(...dadosJSON);
        }
        return dadosTransformados;
    },

    fileListToJsonArray,
};

export default xlsxUtils;
