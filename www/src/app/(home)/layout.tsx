import { ReactNode } from "react"

import { SiteHeader } from "@/components/site-header"
import Background from "@/components/background/background"

export default async function marketingLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main>
      <Background />
      <SiteHeader />
      <div className=" px-4 md:px-16">{children}</div>
    </main>
  )
}
