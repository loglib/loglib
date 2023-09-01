import { DocsConfig } from "types";

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
            title: "Tracker",
            items: [
                {
                    title: "Quick Start",
                    href: "/docs/advanced/tracker",
                },
                {
                    title: "User Consent",
                    href: "/docs/advanced/user-consent",
                },
                {
                    title: "Custom Events",
                    href: "/docs/advanced/custom-events",
                },
                {
                    title: "Track View",
                    href: "/docs/advanced/track-view",
                },
                {
                    title: "Track Click",
                    href: "/docs/advanced/track-click",
                },
                {
                    title: "Next.js Proxy",
                    href: "/docs/advanced/next-proxy",
                },
                {
                    title: "Astro Proxy",
                    href: "/docs/advanced/astro-proxy",
                },
                // {
                //     title: "Send Data to your own server",
                //     href: "/docs/advanced/send-data-to-your-own-server",
                // },
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
                    title: "Insight",
                    href: "/docs/api/insight",
                },
                {
                    title: "Hits",
                    href: "/docs/api/hits",
                },
            ],
        },
    ],
};
