import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
    appDir: true,
    serverActions: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: [
    "@loglib/core",
    "@loglib/next",
    "@loglib/tracker",
    "@loglib/ui",
  ],
}
export default nextConfig
