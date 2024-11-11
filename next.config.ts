import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    redirects: async () => {
        return [
            {
                source: "/",
                destination: "/sistema/home",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
