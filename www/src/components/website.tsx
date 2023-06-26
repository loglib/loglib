"use client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Website } from "../../@prisma"
import Image from "next/image"
import { ChevronLeft, ChevronRight, LucideSettings, Settings, User2 } from "lucide-react"
import { Button } from "./ui/button"
import { useAtom } from "jotai"
import { editFormModalAtom, websiteDataAtom } from "@/jotai/store"
import Link from "next/link"
import { Icons } from "./icons"
import { useState } from "react"



interface WebsiteProps {
  site: Website,
  visitors: number,
  key: string
}

export function Website({ site, visitors, key }: WebsiteProps) {
  const [, setEditForm] = useAtom(editFormModalAtom)
  const [, setFormData] = useAtom(websiteDataAtom)
  const [isLoading, setIsLoading] = useState(false)
  return (

    <Card key={key} className=" border-slate-400/20 bg-gradient-to-tr shadow-sm shadow-orange-800/40 dark:from-black dark:to-slate-900/30">
      <div className="card__layer1"></div>
      <div className="card__layer2"></div>
      <CardHeader className="">
        <div className=" flex items-center justify-between">
          <h3 className=" font-heading text-2xl font-bold">
            {site.title}
          </h3>
          <LucideSettings className=" cursor-pointer" onClick={() => {
            setFormData(site)
            setEditForm(true)
          }} />
        </div>
        <p className="">
          {site.url}
        </p>
      </CardHeader>
      <CardContent className=" flex items-center justify-between gap-2">
        <div>
          <div className=" flex items-center gap-2 text-orange-400">
            <User2 size={20} className=" " />
            <p className="  font-bold">
              {visitors} Visitors
            </p>
          </div>
        </div>
        <Link href={`/${site.id}`}>
          <Button variant="outline" className=" " onClick={() => {
            setFormData(site)
            setIsLoading(true)
          }}>
            {
              isLoading ? <Icons.spinner className=" h-4 w-4 animate-spin" /> : "Go to Dashboard"
            }
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

Website.Skeleton = function WebsiteSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
