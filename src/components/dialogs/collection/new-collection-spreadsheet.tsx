"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/inputs/input";
import { Label } from "@/components/ui/label";
import Text from "@/components/ui/text";
import actions from "@/lib/actions";
import { cn } from "@/lib/utils/tailwind";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useRef, useState } from "react";

const FORM_XLSX_FILES_ID = "form-xlsx-files";
const INPUT_XLSX_FILES_ID = "input-xlsx-files";

export default function NewCollectionSpreadsheetDialog() {
    //HOOKS
    const route = useRouter();
    const params = useParams();

    const inputFileRef = useRef<HTMLInputElement>(null);

    const [filesName, setFilesName] = useState<string[]>([]);

    //VARIABLES
    const modelId = params.id as string;
    const createOneCollectionBySpreadsheets = actions.createOneCollectionBySpreadsheets.bind(null, modelId);

    //EVENTS
    const goToBackPage = useCallback(() => setTimeout(() => route.back(), 100), [route]);

    const clickOnInputWhenEnter = useCallback(
        (e: React.KeyboardEvent<HTMLLabelElement>) => {
            if (e.key === "Enter") inputFileRef.current?.click();
        },
        [inputFileRef]
    );

    const showUploadedFiles = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList) return;

        const arrFiles = Array.from(fileList);
        setFilesName(arrFiles.map((file) => file.name));
    }, []);

    const cleanFilesNameAndCleanInputFile = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setFilesName([]);

            const fileInput = inputFileRef.current;
            if (!fileInput) return;
            fileInput.value = "";
        },
        [inputFileRef]
    );

    return (
        <Dialog defaultOpen={true} onOpenChange={goToBackPage}>
            <DialogContent className="!w-[95svw]">
                <DialogHeader className="border-b pb-2">
                    <DialogTitle>Nova Coleção</DialogTitle>
                    <DialogDescription>Importando coleção de dados através de planilhas.</DialogDescription>
                </DialogHeader>
                <div className="flex size-full flex-col p-2">
                    <form id={FORM_XLSX_FILES_ID} action={createOneCollectionBySpreadsheets}>
                        <div
                            className={cn(
                                "flex h-[60svh] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-foreground/50 p-5",
                                filesName.length > 0 && "hidden"
                            )}
                        >
                            <Label
                                htmlFor={INPUT_XLSX_FILES_ID}
                                tabIndex={0}
                                className="rounded bg-primary p-2"
                                onKeyDown={clickOnInputWhenEnter}
                            >
                                Upload Arquivos
                            </Label>
                            <Text small secondary>
                                Clique para fazer upload ou arraste os arquivos até aqui.
                            </Text>
                        </div>
                        <Input
                            onChange={showUploadedFiles}
                            ref={inputFileRef}
                            id={INPUT_XLSX_FILES_ID}
                            type="file"
                            multiple
                            accept=".xlsx"
                            className="hidden"
                            name="files"
                        />
                        <div className={cn("hidden w-full gap-2", filesName.length > 0 && "flex flex-col")}>
                            <div className="flex w-full">
                                <span>Arquivos selecionados: {filesName.join(", ")}</span>
                            </div>
                            <div className="flex w-full justify-end gap-2">
                                <Button onClick={cleanFilesNameAndCleanInputFile} variant={"secondary"}>
                                    Limpar
                                </Button>
                                <Button type="submit" form={FORM_XLSX_FILES_ID}>
                                    Criar coleção
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
