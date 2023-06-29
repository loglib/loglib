import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Card } from "@/components/ui/card"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { TeamCreateButton } from "@/components/team-create-button"
import { TeamForm } from "@/components/team-create-form"
import { TeamsList, TeamWithUsers } from "@/components/teams-list"
import { WebsiteCreateButton } from "@/components/website-create-button"

const Page = () => {
  const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
  const teams: TeamWithUsers[] = [
    {
      id: "1",
      name: "Loglib Team",
      createdAt: yesterday,
      updatedAt: new Date(),
      TeamUser: [
        {
          id: "1",
          userId: "1",
          teamId: "1",
          createdAt: yesterday,
          updatedAt: new Date(),
          role: "ADMIN",
          User: {
            id: "1",
            name: "Loglib User",
            email: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            emailVerified: null,
            image: null,
            stripeCustomerId: null,
            stripeSubscriptionId: null,
            stripePriceId: null,
            stripeCurrentPeriodEnd: null,
          },
        },
      ],
    },
  ]
  return (
    <section className=" space-y-8">
      <div className=" flex justify-end">
        <TeamCreateButton teamsCount={0} />
      </div>
      {teams.length ? (
        <TeamsList teams={teams} />
      ) : (
        <EmptyPlaceholder className=" my-4">
          <EmptyPlaceholder.Icon name="users" />
          <EmptyPlaceholder.Title>No Teams Yet</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You haven&apos;t created any team yet. Start by creating a team.
          </EmptyPlaceholder.Description>
          <TeamCreateButton teamsCount={0} />
        </EmptyPlaceholder>
      )}
      <TeamForm />
    </section>
  )
}

export default Page
