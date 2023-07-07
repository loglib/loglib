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
      title: "Self Hosted/App Embedded",
      items: [
        {
          title: "Quick Setup",
          href: "/docs/quick-setup",
        },
        {
          title: "Next Js with Prisma",
          href: "/docs/nextjs-with-prisma",
        },
        {
          title: "Next Js with supabase",
          href: "/docs/manual-setup/nextjs-with-supabase",
        },
      ],
    },
    {
      title: "Packages",
      items: [
        {
          title: "Tracker",
          href: "/docs/packages/tracker",
        },
        {
          title: "Server",
          href: "/docs/packages/server",
        },
        {
          title: "Dashboard",
          href: "/docs/packages/dashboard",
        },
        {
          title: "Wordpress Plugin",
          href: "/docs/packages/wordpress-plugin",
        },
      ],
    },
    {
      title: "API",
      items: [
        {
          title: "Session",
          href: "/docs/api/session",
        },
      ],
    },
  ],
}
