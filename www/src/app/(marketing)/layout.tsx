import { SiteHeader } from "@/components/site-header"

const marketingLayout = (props: any) => {
  return (
    <main>
      <header className="max-w-8xl sticky mb-16 mt-4 w-full">
        <SiteHeader />
      </header>
      {props.children}
    </main>
  )
}

export default marketingLayout
