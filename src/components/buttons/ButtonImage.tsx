import Button, { ButtonProps } from "./Button";

export interface ButtonImageProps extends ButtonProps {
    alt: string;
    src?: string;
}

export default function ButtonImage({ alt, src, ...rest }: ButtonImageProps) {
    //VARIABLES
    return (
        <Button {...rest}>
            <img alt={alt} src={src} className={`${rest.rounded} object-cover w-full h-full`} />
        </Button>
    );
}
