"use client"

import { Dashboard } from "@loglib/ui"

import "@/styles/dashboard.css"
import "@loglib/ui/dist/index.css"

import { useTheme } from "next-themes"

import { Website } from "../../@prisma"
import { AddTracker } from "./add-tracker"

export default function Loglib({
  showHowTo,
  website,
}: {
  website: Website
  showHowTo: boolean
}) {
  const { theme } = useTheme()
  return (
    <main className="tw-dark">
      <AddTracker websiteId={website.id} show={showHowTo} />
      <Dashboard
        className=" tw-bg-gradient-to-tr tw-from-white tw-to-gray-100 dark:tw-from-black dark:tw-to-slate-900/40 tw-p-0 tw-m-0"
        websiteId={website.id}
        websiteUrl={website.url}
        components={{
          header: () => <></>,
        }}
      />
    </main>
  )
}
