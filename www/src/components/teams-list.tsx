"use client"

import { useEffect, useState } from "react"

import { Team as TeamType, TeamUser, User } from "../../@prisma"
import { EmptyPlaceholder } from "./empty-placeholder"
import { Team } from "./team"
import { TeamCreateButton } from "./team-create-button"

export type TeamWithUsers = TeamType & {
  TeamUser: (TeamUser & {
    User: User
  })[]
}

export const TeamsList = ({ teams }: { teams: TeamWithUsers[] }) => {
  const [selected, setSelected] = useState<string>(teams[0].id)
  const [selectedTeam, setTeam] = useState<TeamType | undefined>(undefined)
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    setTeam(teams.find((team) => team.id === selected))
  }, [selected, teams])
  return (
    <>
      <div className=" mt-3 grid grid-cols-1 gap-4 md:grid-cols-3">
        {teams.map((team) => (
          <Team team={team} key={team.id} />
        ))}
      </div>
    </>
  )
}
