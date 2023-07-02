import { User } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"


export type MainNavItem = NavItem


export type NavLink = {
  title: string
  href: string
  disabled?: boolean
  dynamic?: boolean
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  label?: string
  icon?: keyof typeof Icons,
  useInclude?: boolean
} & (
    | {
      href: string
      items?: never
    }
    | {
      href: string
    }
  )

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type DocsConfig = {
  sidebarNav: SidebarNavItem[]
}

export type DashboardConfig = {
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number
    isPro: boolean
  }

