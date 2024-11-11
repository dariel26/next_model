import { useContext } from "react";
import { IconRootContext } from "./Icon";

export default function MenuIcon() {
    //CONTEXT
    const { classNameDefault, className } = useContext(IconRootContext);

    return (
        <svg
            className={[classNameDefault, className].join(" ")}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
        >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </svg>
    );
}
