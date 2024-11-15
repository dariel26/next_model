import "./globals.css";
import type { Metadata } from "next";
import SYSTEM_ABOUT from "@/constants/system-about";
import { ThemeProvider } from "@/providers/theme-provider";

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
        <html lang="pt-Br" suppressHydrationWarning>
            <body>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
