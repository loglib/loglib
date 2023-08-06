import { ReactNode } from "react";
export default async function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <main>
            <div className="grid gap-1">
                <h1 className="font-heading text-3xl md:text-4xl">Teams</h1>
                <p className="text-muted-foreground text-lg">Mange your teams and team members</p>
            </div>
            {children}
        </main>
    );
}
