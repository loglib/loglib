import { ReactNode } from "react";

import { DashboardHeader, PublicDashboardHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/session";

export default async function layout({ children }: { children: ReactNode }) {
    const user = await getCurrentUser();

    return (
        <main className="space-y-8 md:px-16 px-4 min-h-[99vh]  bg-gradient-to-tr dark:from-slate-950 dark:to-slate-950/50 from-white to-slate-200">
            {user ? <DashboardHeader user={user} /> : <PublicDashboardHeader />}
            <div>{children}</div>
        </main>
    );
}
