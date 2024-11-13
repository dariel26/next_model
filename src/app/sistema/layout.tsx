import { LayoutSystemMenu } from "@/components";
import { ReactNode } from "react";

export interface SystemLayoutProps {
    children?: ReactNode;
}

export default function SystemLayout(props: SystemLayoutProps) {
    return <LayoutSystemMenu {...props} />;
}
