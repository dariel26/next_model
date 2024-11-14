import { ReactNode, useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

export type TButtonVariant = "primary" | "transparent";
export interface ButtonProps {
    title: string;
    className?: string;
    variant?: TButtonVariant;
    children?: ReactNode;
    onClick?: () => void | Promise<void>;
}

export default function Button({ variant, onClick, ...props }: ButtonProps) {
    //HOOKS
    const [loading, setLoading] = useState(false);

    //VARIABLES
    const variantDefined = variant ?? "primary";
    const bgButtonVariant: Record<TButtonVariant, string> = {
        primary: "bg-primary hover:bg-primary-hover active:bg-primary-active",
        transparent: "bg-transparent hover:bg-black/10 active:bg-black/20",
    };

    //EVENTS
    const handleOnClickButton = useCallback(async () => {
        try {
            setLoading(true);
            if (!onClick) return;
            await onClick();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [onClick]);

    return (
        <button
            onClick={handleOnClickButton}
            className={twMerge(
                "relative flex select-none content-center items-center p-1 duration-200 ease-in-out",
                bgButtonVariant[variantDefined],
                props.className
            )}
            title={props.title}
        >
            <div className={twMerge("oapcity-100 flex transition-opacity duration-300", loading && "opacity-0")}>
                {props.children}
            </div>
            <div
                className={twMerge(
                    "absolute start-0 top-0 flex size-full items-center justify-center",
                    !loading && "hidden"
                )}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="aspect-square h-[50%] animate-spin fill-current"
                    viewBox="0 -960 960 960"
                >
                    <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
                </svg>
            </div>
        </button>
    );
}
