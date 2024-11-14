import { twMerge } from "tailwind-merge";

export default function XIcon(props: { className?: string }) {
    return (
        <svg
            className={twMerge("fill-current", props.className)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
        >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
    );
}
