import { db } from "@/lib/db"

export const getTeams = async (userId: string) => {
    const teams = await db.team.findMany({
        where: {
            TeamUser: {
                some: {
                    AND: {
                        userId,
                        accepted: true
                    }
                },
            },
        },
        include: {
            TeamUser: {
                select: {
                    id: true,
                    accepted: true,
                    role: true,
                    userId: true,
                    createdAt: true,
                    User: {
                        select: {
                            name: true,
                            email: true,
                            id: true,
                        }
                    }
                }
            },
            TeamWebsite: {
                include: {
                    Website: {
                        select: {
                            id: true,
                            title: true,
                        }
                    },
                },
            },
        },
    }).then(res => res.map(team => ({
        ...team,
        TeamUser: team.TeamUser.map(teamUser => ({
            ...teamUser,
            name: teamUser.User.name,
            email: teamUser.User.email,
        })),
    })))
    return teams
}
export type Teams = Awaited<ReturnType<typeof getTeams>>