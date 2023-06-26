import DashboardNav from "@/components/side-nav"

export default async function DashboardSideBarLayout({ children }) {
    return (
        <main className="grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
            <aside className="hidden w-[200px] flex-col pr-4 md:flex">
                <DashboardNav items={[{
                    title: "Websites",
                    icon: "layout",
                    href: "/dashboard"
                }, {
                    title: "Api Keys",
                    icon: "key",
                    href: "/dashboard/api-keys"
                }]} />
            </aside>
            <main className="flex w-full flex-1 flex-col">
                {children}
            </main>
        </main>
    )
}