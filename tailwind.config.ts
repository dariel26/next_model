import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            size: {
                "icon-sm": "1.4rem",
                "icon-md": "1.7rem",
                "icon-lg": "1.9rem",
            },
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
        },
    },
    plugins: [],
} satisfies Config;
