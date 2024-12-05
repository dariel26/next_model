import constants from "@/constants";
import type { NextConfig } from "next";

//TODO: ignoreDuringBuilds equals true deve ser removido. O ideal é que os erros do eslint sejam mostrados durante o desenvolvimento e não apenas no build
// Além disso desabilitar somente o da tipagem ANY visto que as vezes é necessário.
const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    redirects: async () => {
        return [
            {
                source: "/",
                destination: constants.ROUTES.home,
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
