import { WebsiteCreateButton } from "@/components/website-create-button"
import { WebsiteForm } from "@/components/website-create-form"
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
