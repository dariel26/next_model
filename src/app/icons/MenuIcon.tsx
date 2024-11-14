import { twMerge } from "tailwind-merge";

export default function MenuIcon(props: { className?: string }) {
    return (
        <svg
            className={twMerge("fill-current", props.className)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
        >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
    );
}
