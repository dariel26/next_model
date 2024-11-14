import ButtonImage from "../buttons/ButtonImage";
import SYSTEM_ABOUT from "@/constants/systemAbout";

export default function HeaderDefault() {
    return (
        <header className="bg-dark inline-flex h-full w-full shrink-0 content-center justify-between bg-primary p-1 pe-2 ps-2">
            <div className="inline-flex items-center gap-2">
                <ButtonImage
                    className="aspect-square h-full rounded-lg"
                    title={SYSTEM_ABOUT.TITLE}
                    alt="business-icon"
                    src="/icon.jpeg"
                />
                <h5 className="text-2xl font-bold tracking-wide">{SYSTEM_ABOUT.TITLE}</h5>
            </div>
            <ButtonImage
                className="aspect-square h-full rounded-full"
                title="Menu do Usuário"
                alt="user-icon"
                src="/user.jpg"
            />
        </header>
    );
}
