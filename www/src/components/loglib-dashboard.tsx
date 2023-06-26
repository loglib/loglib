"use client"
import { Dashboard } from "@loglib/ui"
import "@loglib/ui/dist/index.css"
import { AddTracker } from "./add-tracker"
import { GetInsightResponse } from "@loglib/core"
import { Website } from "@prisma/client"


export default function Loglib({ showHowTo, website }: { website: Website, showHowTo: boolean }) {
    return (
        <main className="">
            <AddTracker websiteId={website.id} show={showHowTo} />
            <Dashboard
                className=" m-0  bg-gradient-to-tr from-white to-gray-100 p-0 dark:from-black dark:to-slate-900/30"
                websiteId={website.id}
                websiteUrl={website.url}
                components={{
                    header: () => <></>
                }}
            />
        </main>
    )
}