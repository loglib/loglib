import { DocsSidebarNav } from "@/components/sidebar-nav";
import { docsConfig } from "@/config/docs";

interface DocsLayoutProps {
    children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
    return (
        <div className="flex-1 md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10  bg-gradient-to-tr dark:from-stone-950 dark:to-stone-950/50 from-white to-stone-200 relative">
            <aside className="fixed top-24 z-30 hidden h-[calc(100vh-5.5rem)] w-full shrink-0 overflow-y-auto border-r py-6 pr-2 md:sticky md:block lg:py-10">
                <DocsSidebarNav items={docsConfig.sidebarNav} />
            </aside>
            {children}
        </div>
    );
}
