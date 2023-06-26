import { DeleteWebsiteAlert } from "@/components/delete-website-alert"
import { EditWebsiteForm } from "@/components/edit-website-form"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader, SiteHeader } from "@/components/site-header"
import { Website } from "@/components/website"
import { WebsiteCreateButton } from "@/components/website-create-button"
import { WebsiteForm } from "@/components/website-from-modal"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { WebsitesList } from "@/components/websites-list"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default async function DashboardPage() {
  const user = await getCurrentUser()
  const websites = await db.website.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      WebSession: {
        distinct: ["visitorId"],
        where: {
          createdAt: {
            gte: new Date(new Date().getTime() - (24 * 60 * 60 * 1000))
          },
        },
        select: {
          id: true
        }
      }
    }
  })
  return (
    <section>
      <div className=" flex justify-end">
        <WebsiteCreateButton websiteCount={websites.length} />
      </div>
      <WebsitesList websites={websites} />
      <WebsiteForm />
      <EditWebsiteForm />
      <DeleteWebsiteAlert />
    </section>
  )

}