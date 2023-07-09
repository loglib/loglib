import { ReactNode } from "react"
import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/site-header"

export default async function layout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser()
  if (!user) return redirect("/login")
  return (
    <main className="space-y-8 md:px-16 px-4 min-h-[99vh]  bg-gradient-to-tr dark:from-slate-950 dark:to-slate-950/50 from-white to-slate-200">
      <DashboardHeader user={user} />
      <div>{children}</div>
    </main>
  )
}
