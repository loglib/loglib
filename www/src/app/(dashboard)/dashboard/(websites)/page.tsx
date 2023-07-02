import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { StoreSetter } from "@/components/store-setter"
import { TeamHeader } from "@/components/team-header"
import { WebsiteCreateButton } from "@/components/website-create-button"
import { WebsiteForm } from "@/components/website-from-modal"
import { WebsitesList } from "@/components/websites-list"

export default async function DashboardPage() {
  return (
    <section>
      <div className=" flex justify-end">
        <WebsiteCreateButton />
      </div>
      <WebsitesList />
      <WebsiteForm />
    </section>
  )
}
