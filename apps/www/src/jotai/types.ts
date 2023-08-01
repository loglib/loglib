import { Team, TeamUser, User, Website } from "generated/client"

export type TeamWithUsers = Team & {
  TeamUser: (TeamUser & {
    User: User
  })[]
}
export type WebsiteWithSessions = Website & {
  WebSession: {
    id: string
  }[]
}
