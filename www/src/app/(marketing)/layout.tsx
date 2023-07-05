import { ReactNode } from "react"

import { SiteHeader } from "@/components/site-header"

export default async function marketingLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <main>
      <header className="max-w-8xl sticky mb-16 mt-4 w-full">
        <SiteHeader />
      </header>
      {children}
    </main>
  )
}
