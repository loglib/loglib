import { DashboardHeader } from "@/components/site-header"
import { getCurrentUser } from "@/lib/session"
import { Layout } from "lucide-react"
import { notFound, redirect } from "next/navigation"



export default async function DashboardLayout({ children }) {
    const user = await getCurrentUser()
    if (!user) return redirect("/login")
    return (
        <main className=" space-y-8">
            <DashboardHeader user={user} />
            <main>
                {children}
            </main>
        </main>
    )
}