// rome-ignore lint/correctness/noUnusedVariables: <explanation>
import { env } from "./env.mjs";
import { withContentlayer } from "next-contentlayer";
import million from "million/compiler"

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    experimental: {
        serverComponentsExternalPackages: ["generated/client"],
        serverActions: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    transpilePackages: ["@loglib/tracker", "@loglib/api"],
};
export default withContentlayer(nextConfig);
