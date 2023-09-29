import { withContentlayer } from "next-contentlayer";
import { env } from "./env.mjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    siteUrl: env.NEXTAUTH_URL ?? "https://loglib.io",
    generateRobotsTxt: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    rewrites: async () => [
        {
            destination: env.NEXT_PUBLIC_API_URL,
            source: "/api/loglib",
        },
    ],
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ["libsql", "@libsql/client", "@loglib/db"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    transpilePackages: ["@loglib/tracker", "@loglib/api"],
};
export default withContentlayer(nextConfig)
