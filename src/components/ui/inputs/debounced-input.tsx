import { useEffect, useState } from "react";
import { Input } from "./input";

export type DebouncedInputProps = {
    value: string;
    onChange: (value: string) => void;
    debounce?: number;
} & React.ComponentProps<"input">;

export default function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: DebouncedInputProps) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value, debounce, onChange]);

    return <Input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}