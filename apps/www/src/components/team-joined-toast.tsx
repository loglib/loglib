"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { toast } from "./ui/use-toast"

export const TeamJoinedToast = ({
  joined,
  expired,
}: {
  joined?: boolean
  expired?: boolean
}) => {
  const router = useRouter()
  useEffect(() => {
    router.replace("/dashboard/team")
  }, [router])
  if (joined) {
    toast({
      title: "Team Joined",
      description: "You have successfully joined the team",
    })
  }
  if (expired) {
    toast({
      title: "Team Invite Expired",
      description: "The team invite has expired",
    })
  }

  return null
}
