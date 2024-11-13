import { ReactNode, useCallback, useState } from "react";

export interface ButtonProps {
    title: string;
    className?: string;
    variant?: "primary" | "transparent";
    rounded?: string;
    children?: ReactNode;
    onClick?: () => void | Promise<void>;
}

export default function Button({ variant, onClick, ...props }: ButtonProps) {
    //HOOKS
    const [loading, setLoading] = useState(false);

    //VARIABLES
    const classNameByVariant = useCallback((): string => {
        const primaryClassName = "bg-primary hover:bg-primary-hover active:bg-primary-active";
        const transparentClassName = "bg-transparent hover:bg-black/10 active:bg-black/20";

        switch (variant) {
            case "primary":
                return primaryClassName;
            case "transparent":
                return transparentClassName;
            default:
                return primaryClassName;
        }
    }, [variant]);

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
            className={`${props.className} ${
                props.rounded
            } flex content-center items-center p-1 ease-in-out duration-200 ${classNameByVariant()} select-none relative`}
            title={props.title}
        >
            {props.children}
            <div className={`flex size-full absolute start-0 top-0 ${classNameByVariant()} ${loading ? "" : "hidden"}`}>
                {/*Something to show loading state*/}
            </div>
        </button>
    );
}
