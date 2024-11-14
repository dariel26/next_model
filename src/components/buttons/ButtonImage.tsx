import Image from "next/image";
import Button, { ButtonProps } from "./Button";
import { twMerge } from "tailwind-merge";

export interface ButtonImageProps extends ButtonProps {
    alt: string;
    src: string;
}

export default function ButtonImage({ alt, src, ...rest }: ButtonImageProps) {
    //VARIABLES
    return (
        <Button {...rest}>
            <Image
                alt={alt}
                src={src}
                width={512}
                height={512}
                className={twMerge("h-full w-full object-cover", rest.className)}
            />
        </Button>
    );
}
