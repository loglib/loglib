import { redirect } from "next/navigation"
import { getWebsite } from "@/server/query/website"

import { getCurrentUser } from "@/lib/session"
import DashboardNav from "@/components/side-nav"
import { DashboardHeader } from "@/components/site-header"
import { StoreSetter } from "@/components/store-setter"

export default async function DashboardSideBarLayout({ children }) {
  const user = await getCurrentUser()
  if (!user) return redirect("/login")
  const { userWebsites, teamWebsites } = await getWebsite()
  const websites = userWebsites.concat(teamWebsites)
  return (
    <div className=" space-y-8">
      <StoreSetter store="website" data={websites} />
      <StoreSetter store="user" data={user} />
      <StoreSetter store="teamWebsites" data={teamWebsites} />
      <StoreSetter store="userWebsites" data={userWebsites} />
      <DashboardHeader user={user} />
      <main className="grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col pr-4 md:flex">
          <DashboardNav
            items={[
              {
                title: "Websites",
                icon: "layout",
                href: "/dashboard",
              },
              {
                title: "Teams",
                icon: "teams",
                href: "/dashboard/team",
                useInclude: true,
                label: "beta",
              },
              {
                title: "Api Keys",
                icon: "key",
                href: "/dashboard/api-keys",
              },
            ]}
          />
        </aside>
        <main className="flex w-full flex-1 flex-col">{children}</main>
      </main>
    </div>
  )
}
