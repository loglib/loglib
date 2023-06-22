import { DashboardHeader } from "@/components/site-header"
import { getCurrentUser } from "@/lib/session"
import { notFound, redirect } from "next/navigation"



export default async function DashboardLayout({ children }) {
    const user = await getCurrentUser()
    if (!user) return redirect("/login")
    return (
        <main className=" px-28 space-y-16">
            <DashboardHeader user={user} />
            {children}
        </main>
    )
}