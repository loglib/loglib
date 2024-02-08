import { siteConfig } from "@/config/site";
import { redirect } from "next/navigation"

export const metadata = {
    openGraph: {
        type: "website",
        locale: "en_US",
        title: "Loglib Analytics raises $10 million series A",
        description: "Loglib Analytics raises $10 million series A",
        siteName: "Loglib",
        images: `${siteConfig.url}/assets/rick-roll.png`,
    },
    twitter: {
        card: "summary_large_image",
        title: "loglib",
        description: "Loglib Analytics raises $10 million series A",
        images: [`${siteConfig.url}/assets/rick-roll.png`],
        creator: "@logib_io",
    },
};

export const Investment = () => {
    return redirect("https://www.youtube.com/watch?v=oHg5SJYRHA0")
}