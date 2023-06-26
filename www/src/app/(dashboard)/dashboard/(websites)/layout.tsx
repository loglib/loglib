import DashboardNav from "@/components/side-nav"

export default async function DashboardSideBarLayout({ children }) {
    return (
        <main>
            <div className="grid gap-1">
                <h1 className="font-heading text-3xl md:text-4xl">Websites</h1>
                <p className="text-lg text-muted-foreground">Manage your websites</p>
            </div>
            <main className="flex w-full flex-1 flex-col">
                {children}
            </main>
        </main>
    )
}