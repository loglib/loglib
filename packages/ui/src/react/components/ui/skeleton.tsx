import React from "react"
import { cn } from "@/react/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("tw-animate-pulse tw-rounded-md tw-bg-slate-100 dark:tw-bg-slate-800", className)}
      {...props}
    />
  )
}

export { Skeleton }
