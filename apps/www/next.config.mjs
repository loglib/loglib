import { env } from "./env.mjs"
import { withContentlayer } from "next-contentlayer"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "vgssydupjvshgeeeqjvo.supabase.co",
    ],
  },
  rewrites: async () => [
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
  transpilePackages: ["@loglib/tracker", "@loglib/api"],
}
export default withContentlayer(nextConfig)
