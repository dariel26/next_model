import * as XLSX from "xlsx";

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
};

export default xlsxUtils;
