import { AboutFormProps } from "./types.form";

export default function AboutForm(props: AboutFormProps) {
    return (
        <div className="mb-2 flex flex-col gap-1 border-b pb-2">
            <h3 className="text-xl font-bold">{props.title}</h3>
            <span className="text-sm text-secondary-foreground">{props.children}</span>
        </div>
    );
}
