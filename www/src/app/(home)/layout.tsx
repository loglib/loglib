import { ReactNode } from "react"

import { SiteHeader } from "@/components/site-header"

export default async function marketingLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main>
      <SiteHeader />
      <div className=" px-4 md:px-16">{children}</div>
    </main>
  )
}
