"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "types"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import { Label } from "./ui/label"

interface DashboardNavProps {
  items: SidebarNavItem[]
}

export default function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }
  const checkActive = (item: SidebarNavItem) => {
    return item.useInclude
      ? path?.includes(item.href ?? "")
      : path === item.href
  }
  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "hover:bg-accent hover:text-accent-foreground group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                  checkActive(item) ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
                {item.label && (
                  <span className=" ml-auto bg-gradient-to-tr from-purple-800 to-slate-800 bg-clip-text text-xs text-transparent dark:from-purple-300 dark:to-slate-200">
                    {item.label}
                  </span>
                )}
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
