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
    rewrites: async () => [
        {
            destination: env.NEXT_PUBLIC_API_URL,
            source: "/api/loglib",
        },
    ],
    experimental: {
        serverActions: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    transpilePackages: ["@loglib/tracker", "@loglib/api"],
};
export default million.next(withContentlayer(nextConfig), {
    auto:{
        rsc: true,
        threshold: 0.3
    }
});
