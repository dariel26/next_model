import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import SYSTEM_ABOUT from "@/constants/systemAbout";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

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
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased h-svh w-svw`}>{children}</body>
        </html>
    );
}
