import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/site-header"

export default async function layout({ children }) {
  const user = await getCurrentUser()
  if (!user) return redirect("/login")
  return (
    <main className="space-y-8">
      <DashboardHeader user={user} />
      <div>{children}</div>
    </main>
  )
}
