import { useState } from "react"
import Link from "next/link"
import { formatDistance } from "date-fns"
import { LucideSettings, User2 } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"

import { Icons } from "./icons"
import { TeamWithUsers } from "./teams-list"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"

interface TeamProps {
  team: TeamWithUsers
  key: string
}

export function Team({ team, key }: TeamProps) {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Card
      key={key}
      className=" border-slate-400/20 bg-gradient-to-tr shadow-sm shadow-orange-800/40 dark:from-black dark:to-slate-900/30"
    >
      <div className="card__layer1"></div>
      <div className="card__layer2"></div>
      <CardHeader className="">
        <div className=" flex items-center justify-between">
          <h3 className=" font-heading text-2xl font-bold">{team.name}</h3>
          <LucideSettings className=" cursor-pointer" />
        </div>
        <p className="">{formatDistance(team.createdAt, new Date())} ago</p>
      </CardHeader>
      <CardContent className=" flex items-center justify-between gap-2">
        <div>
          <div className=" flex items-center gap-2 text-orange-400">
            <Icons.users size={20} className=" " />
            <p className="  font-bold">{team.TeamUser.length} Members</p>
          </div>
        </div>
        <Link href={`/dashboard/team/${team.id}`}>
          <Button
            variant="outline"
            className=" "
            onClick={() => {
              setIsLoading(true)
            }}
          >
            <p>Manage</p>
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

Team.Skeleton = function TeamSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
