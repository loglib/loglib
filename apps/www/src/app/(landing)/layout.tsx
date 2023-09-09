import { ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";

export default async function MarketingLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <main className="overflow-x-hidden">
            <SiteHeader />
            <div className=" px-4 md:px-16">{children}</div>
        </main>
    );
}
