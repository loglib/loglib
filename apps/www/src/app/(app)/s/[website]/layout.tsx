import { ReactNode } from "react";

import { DashboardHeader, PublicDashboardHeader } from "@/components/site-header";
import { getCurrentUser } from "@/lib/session";

export default async function layout({ children }: { children: ReactNode }) {
    const user = await getCurrentUser();

    return (
        <main className="mx-auto max-w-[1820px] space-y-8 md:px-16 px-4 min-h-[99vh]  bg-gradient-to-tr dark:from-stone-950 dark:to-stone-950/50 from-white to-stone-200">
            {user ? <DashboardHeader user={user} /> : <PublicDashboardHeader />}
            <div>{children}</div>
        </main>
    );
}
