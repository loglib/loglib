import { DocsConfig } from "types"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Guides",
      href: "/guides",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
      ],
    },
    {
      title: "Self Hosted",
      items: [
        {
          title: "Quick Setup",
          href: "/docs/quick-setup",
        },
        {
          title: "Next Js with Prisma",
          href: "/docs/self-host/nextjs-with-prisma",
        },
        {
          title: "Next Js with Supabase",
          href: "/docs/self-host/nextjs-with-supabase",
        },
        {
          title: "Upgrading",
          href: "/docs/self-host/upgrading",
        },
      ],
    },
    {
      title: "Advanced Setup",
      items: [
        {
          title: "Tracker",
          href: "/docs/advanced/tracker",
        },
        {
          title: "Server",
          href: "/docs/advanced/server",
        },
        {
          title: "Dashboard",
          href: "/docs/advanced/dashboard",
        },

        {
          title: "Next.js Proxy",
          href: "/docs/advanced/next-proxy",
        },
        {
          title: "Send Data to your own server",
          href: "/docs/advanced/send-data-to-your-own-server",
        },
        {
          title: "Wordpress Plugin",
          href: "/docs/advanced/wordpress-plugin",
        },
      ],
    },
    {
      title: "API",
      items: [
        {
          title: "Overview",
          href: "/docs/api",
        },
        {
          title: "Session",
          href: "/docs/api/session",
        },
        {
          title: "Pageview",
          href: "/docs/api/pageview",
        },
        {
          title: "Event",
          href: "/docs/api/event",
        },
        {
          title: "Visitor",
          href: "/docs/api/visitor",
        },
      ],
    },
  ],
}
