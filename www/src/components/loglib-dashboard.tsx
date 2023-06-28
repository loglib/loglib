"use client"

import { Dashboard } from "@loglib/ui"

import "@loglib/ui/dist/index.css"

import { Website } from "../../@prisma"
import { AddTracker } from "./add-tracker"

import "@/styles/dashboard.css"

export default function Loglib({
  showHowTo,
  website,
}: {
  website: Website
  showHowTo: boolean
}) {
  return (
    <main>
      <AddTracker websiteId={website.id} show={showHowTo} />
      <Dashboard
        className="tw-p-0 tw-m-0 dashboard bg-none dark:bg-none"
        websiteId={website.id}
        websiteUrl={website.url}
        noAuth
        components={{
          header: () => <></>,
        }}
      />
    </main>
  )
}
