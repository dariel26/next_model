import { useContext } from "react";
import { IconRootContext } from "./Icon";

export default function ColapseLeftIcon() {
    //CONTEXT
    const { classNameDefault, className } = useContext(IconRootContext);
    return (
        <svg
            className={[classNameDefault, className].join(" ")}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
        >
            <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
        </svg>
    );
}