import React, { ReactElement, useState } from "react";
import { ListFilter } from "lucide-react";
import { cn } from "@/lib/utils/tailwind";
import { CommomFilterProps } from "./types/index.dt";
import DebouncedInput, { DebouncedInputProps } from "@/components/ui/inputs/debounced-input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const LABEL_RESET_FILTER_BUTTON = "Reset Filter";

export default function CommomFilter({ children, filterActive, resetFilterFn }: CommomFilterProps) {
    //STATES
    const [open, setOpen] = useState(false);

    //VARIABLES
    const [_debounceInput, popoverContent] = React.Children.toArray(children);

    //CHECK ON DEVELOPMENT MODE
    if (process.env.NODE_ENV === "development") {
        if (!React.isValidElement(_debounceInput) || _debounceInput.type !== DebouncedInput) {
            throw new Error("VariantCommon expects the first child to be a DebounceInput component.");
        }
    }

    const debounceInput = React.cloneElement<DebouncedInputProps>(_debounceInput as ReactElement, {
        className: cn("h-full bg-background text-sm", filterActive && "border-2 border-primary-foreground"),
    });

    return (
        <div className="flex h-8 justify-center gap-1 w-full">
            {debounceInput}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button className="relative h-full p-2 !ring-primary" variant={"ghost"}>
                        <ListFilter className={cn(filterActive && "text-primary-foreground")} />
                        {filterActive && (
                            <div className="absolute bottom-0 end-0 m-1 size-2 rounded-full bg-primary-foreground" />
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="max-h-[70svh] w-auto min-w-48 max-w-lg p-0">
                    {popoverContent}
                    <div className="w-full p-1">
                        <Button className="w-full" onClick={resetFilterFn}>
                            {LABEL_RESET_FILTER_BUTTON}
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
