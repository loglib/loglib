"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { useAtom } from "jotai"
import { websiteFormAtom } from "@/jotai/store"

interface WebsiteCreateButtonProps extends ButtonProps {
  websiteCount: number
}

export function WebsiteCreateButton({
  className,
  variant,
  ...props
}: WebsiteCreateButtonProps) {
  const [, setCreateWebsite] = useAtom(websiteFormAtom)
  async function onClick() {
    if (props.websiteCount > 1) {
      return toast({
        title: "Limit of 2 websites reached.",
        description: "We currently only support 2 websites per account.",
        variant: "destructive",
      })
    }
    setCreateWebsite(true)
  }
  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant })
      )}
      {...props}
    >
      <Icons.add className="h-4 w-4 " />
      <span className="">
        New Website
      </span>
    </button>
  )
}
