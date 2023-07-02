import { notFound, redirect } from "next/navigation"
import { getTeams } from "@/server/query"
import { getWebsite } from "@/server/query/website"
import { Layout } from "lucide-react"

import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { DashboardHeader } from "@/components/site-header"
import { StoreSetter } from "@/components/store-setter"

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser()
  if (!user) return redirect("/login")
  const websites = await getWebsite(user.id)
  return (
    <main className=" space-y-8">
      <StoreSetter store="website" data={websites} />
      <StoreSetter store="user" data={user} />
      <DashboardHeader user={user} />
      <main>{children}</main>
    </main>
  )
}
