import { withContentlayer } from "next-contentlayer";
import { env } from "./env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    images: {
        domains: ["avatars.githubusercontent.com", "vgssydupjvshgeeeqjvo.supabase.co"],
    },
    rewrites: () => [
        {
            destination: env.NEXT_PUBLIC_API_URL,
            source: "/api/loglib",
        },
    ],
    experimental: {
        serverComponentsExternalPackages: ["generated/client"],
        serverActions: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    transpilePackages: ["@loglib/core", "@loglib/next", "@loglib/tracker"],
};
export default withContentlayer(nextConfig);
