import { withContentlayer } from "next-contentlayer"

import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["@loglib/ui", "@loglib/core", "@loglib/next"],
}
export default nextConfig
