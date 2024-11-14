import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../buttons/Button";
import { XIcon } from "@/app/icons";

export interface OffcanvasProps {
    placement?: "left" | "right";
    show?: boolean;
    children?: ReactNode;
    className?: string;
    onHide?: () => void;
}

export default function Offcanvas(props: OffcanvasProps) {
    return (
        <div
            className={twMerge("relative z-10 size-0", !props.show && "oveflow-hidden pointer-events-none")}
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                className={twMerge(
                    "fixed inset-0 size-full bg-gray-500/75 transition-opacity duration-500",
                    props.show ? "opacity-100" : "opacity-0"
                )}
                aria-hidden="true"
            />

            <div
                onClick={props.onHide}
                className={twMerge(
                    "fixed inset-0 overflow-hidden transition-transform duration-500",
                    props.placement === "right"
                        ? props.show
                            ? "translate-x-0"
                            : "translate-x-full"
                        : props.show
                          ? "translate-x-0"
                          : "translate-x-[-100%]"
                )}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={twMerge(
                            "pointer-events-none fixed inset-y-0 flex max-w-full",
                            `${props.placement === "left" ? "left-0 pe-10" : "right-0 pl-10"}`
                        )}
                    >
                        <div
                            className={twMerge("pointer-events-auto relative w-screen max-w-[20rem]", props.className)}
                        >
                            <div
                                className={twMerge(
                                    "absolute top-0 flex pt-4 text-foreground transition-all duration-500",
                                    `${props.placement === "left" ? "right-0 mr-4 md:-mr-10" : "left-0 ml-4 md:-ml-10"}`
                                )}
                            >
                                <Button
                                    onClick={props.onHide}
                                    title="Close Menu"
                                    variant="transparent"
                                    className={twMerge(
                                        "relative z-10 rounded-md md:text-white md:ring-white",
                                        !props.show && "hidden"
                                    )}
                                >
                                    <XIcon className="size-icon-sm fill-current" />
                                </Button>
                            </div>

                            <div className="flex h-full flex-col overflow-y-auto bg-background shadow-xl">
                                <div className={twMerge("relative flex-1", !props.show && "hidden")}>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
