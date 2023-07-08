"use client"

import { Dashboard } from "@loglib/ui"

import "@loglib/ui/dist/index.css"

import { Website } from "../../@prisma"
import { AddTracker } from "./add-tracker"

import "@/styles/dashboard.css"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export default function Loglib({
  showHowTo,
  website,
}: {
  website: Website
  showHowTo: boolean
}) {
  const { theme } = useTheme()
  return (
    <main className={theme === "dark" ? "tw-dark dark" : ""}>
      <AddTracker websiteId={website.id} show={showHowTo} />
      <Dashboard
        className="tw-p-0 tw-m-0 dashboard tw-bg-none dark:tw-bg-none "
        websiteId={website.id}
        websiteUrl={website.url}
        noAuth
        components={{
          header: () => <></>,
        }}
        theme={theme as "dark"}
      />
    </main>
  )
}
