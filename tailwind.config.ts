import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "var(--primary)",
                    hover: "var(--primary-light)",
                    active: "var(--primary-dark)",
                },
                background: {
                    DEFAULT: "var(--background)",
                    hover: "var(--background-light)",
                    active: "var(--background-dark)",
                },
                foreground: "var(--foreground)",
            },
            gridTemplateRows: {
                "system-root": "3rem calc(100svh - 3rem)",
            },
        },
    },
    plugins: [],
} satisfies Config;
