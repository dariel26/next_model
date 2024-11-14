import { twMerge } from "tailwind-merge";

export default function ColapseLeftIcon(props: { className?: string }) {
    return (
        <svg
            className={twMerge("fill-current", props.className)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
        >
            <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
        </svg>
    );
}
