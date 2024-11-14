import "./globals.css";
import type { Metadata } from "next";
import SYSTEM_ABOUT from "@/constants/systemAbout";

export const metadata: Metadata = {
    title: SYSTEM_ABOUT.TITLE,
    description: SYSTEM_ABOUT.DESCRIPTION,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-Br">
            <body className={` antialiased h-svh w-svw overflow-hidden`}>
                {children}
            </body>
        </html>
    );
}
