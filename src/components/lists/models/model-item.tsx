import Link from "next/link";
import { ModelListItemProps } from "./types";
import { format } from "date-fns";
import Text from "@/components/ui/text";
import constants from "@/constants";

export default function ModelListItem({ model }: ModelListItemProps) {
    return (
        <li className="flex h-[max-content] w-full flex-col gap-1 border-b py-5">
            <div className="w-full">
                <Link
                    className="text-xl text-primary-foreground hover:underline"
                    href={constants.ROUTES.model(model.id)}
                >
                    {model.name}
                </Link>
            </div>
            {model.about && (
                <div className="mt-2 w-full border-l-2 border-primary-foreground px-4">
                    <Text secondary>{model.about}</Text>
                </div>
            )}
            <div className="mt-2 w-full">
                <Text secondary small>
                    Atualizado em: {format(model.updatedAt, "dd/MM/yyyy")}
                </Text>
            </div>
        </li>
    );
}
