import { ReactNode } from "react"

export default function APIKeysLayout({ children }: { children: ReactNode }) {
  return (
    <section className=" space-y-8">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">API Keys</h1>
        <p className="text-muted-foreground text-lg">Manage your api keys</p>
      </div>
      {children}
    </section>
  )
}
