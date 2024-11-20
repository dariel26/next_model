import React, { ReactElement, ReactNode, useState } from "react";
import DebouncedInput, { DebouncedInputProps } from "../../../../ui/inputs/debounced-input";
import { Button } from "../../../../ui/button";
import { ListFilter } from "lucide-react";
import { cn } from "@/lib/utils/tailwind";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../ui/popover";

export type VariantCommonProps = { children?: ReactNode; filterActive?: boolean; resetFilterFn?: () => void };

export default function VariantCommon({ children, filterActive, resetFilterFn }: VariantCommonProps) {
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
        <div className="flex h-8 justify-center gap-1">
            {debounceInput}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button className="relative h-full p-2 !ring-primary" variant={"ghost"}>
                        <ListFilter className={cn(filterActive && "text-primary-foreground")} />
                        {filterActive && (
                            <div className="bg-primary-foreground absolute bottom-0 end-0 m-1 size-2 rounded-full" />
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="max-h-[70svh] p-0 w-auto max-w-lg">
                    {popoverContent}
                    <div className="w-full p-1">
                        <Button className="w-full" onClick={resetFilterFn}>
                            Reset Filter
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
