'use server'

import { z } from "zod";
import { teamInviteSchema, teamSchema } from "../../lib/validations/team";
import { db } from "../../lib/db";
import { getCurrentUser } from "../../lib/session";
import { resend } from "@/lib/resend";
import { TeamInviteEmail } from "@/components/emails/team-invite-email"
import { siteConfig } from "@/config/site";
import { ROLE } from "@prisma";


export async function createTeam(data: z.infer<typeof teamSchema>) {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("You must be logged in to create a team")
    }
    const team = await db.team.create({
        data: {
            name: data.name,
            TeamUser: {
                create: {
                    userId: user.id,
                    role: "owner",
                    accepted: true
                }
            }
        }
    })
    return team
}

export async function inviteTeam(data: z.infer<typeof teamInviteSchema>, teamId: string, toResend?: boolean) {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("You must be logged in to invite to a team")
    }
    const team = await db.team.findUnique({
        where: {
            id: teamId
        },
    })
    if (!team) {
        throw new Error("Team not found")
    }
    const inviteToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const invitedUser = await db.user.findUnique({
        where: {
            email: data.email
        }
    })
    const sendEmail = async () => {
        await resend.sendEmail({
            to: [data.email],
            subject: "You've been invited to join a team",
            react: TeamInviteEmail({
                invitedByEmail: user.email ?? "",
                teamName: team.name,
                invitedByUsername: user.name ?? "",
                inviteLink: `${siteConfig.url}/dashboard/team/invite/${inviteToken}`,
                userImage: user.image ?? "",
            }),
            from: "no-reply@loglib.io"
        })
    }
    if (invitedUser) {
        if (toResend) {
            const teamUser = await db.teamUser.findFirst({
                where: {
                    userId: invitedUser.id,
                    teamId: teamId
                }
            })
            if (teamUser) {
                await db.teamUserInvite.updateMany({
                    where: {
                        teamId,
                        userId: invitedUser.id
                    },
                    data: {
                        status: "expired"
                    }
                })
                await db.teamUserInvite.create({
                    data: {
                        teamId,
                        userId: invitedUser.id,
                        teamUserId: teamUser?.id,
                        token: inviteToken,
                    }
                })
            } else {
                throw new Error("Team user doesn't exists")
            }
            return await sendEmail()
        } else {
            const teamUser = await db.teamUser.create({
                data: {
                    teamId,
                    userId: invitedUser.id,
                    role: data.role,
                    accepted: false
                },
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
            }).then(res => (
                {
                    ...res,
                    name: res.User.name,
                    email: res.User.email,
                }
            ))
            await db.teamUserInvite.create({
                data: {
                    teamId,
                    userId: invitedUser.id,
                    teamUserId: teamUser.id,
                    token: inviteToken
                }
            })
            await sendEmail()
            return teamUser
        }
    } else {
        return null
    }

}


export async function leaveTeam(data: { teamId: string, userId: string, deleteTeam: boolean }) {
    if (data.deleteTeam) {
        await db.team.delete({
            where: {
                id: data.teamId
            }
        })
    }
    await db.teamUser.deleteMany({
        where: {
            teamId: data.teamId,
            userId: data.userId,
        }
    })
}

export async function updateTeam(data: z.infer<typeof teamSchema>, id: string) {
    const user = await getCurrentUser()

    const res = await db.team.update({
        where: {
            id
        },
        data: {
            name: data.name
        },
        include: {
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
        }
    })
    return res
}

export const removeTeamUser = async (id: string) => {
    await db.teamUser.delete({
        where: {
            id
        }
    })
}


export const addWebsiteToTeam = async (teamId: string, websiteId: string) => {
    const isWebsiteAlreadyAdded = await db.teamWebsite.findFirst({
        where: {
            AND: {
                teamId,
                websiteId
            }
        }
    })
    if (isWebsiteAlreadyAdded) {
        return null
    }
    await db.teamWebsite.deleteMany({
        where: {
            teamId
        }
    })
    const res = await db.teamWebsite.create({
        data: {
            teamId,
            websiteId
        }
    })
    return res
}

export const removeAllTeamWebsites = async (teamId: string) => {
    await db.teamWebsite.deleteMany({
        where: {
            teamId
        }
    })
    return true
}


export const updateTeamUser = async (id: string, data: { role?: ROLE }) => {
    await db.teamUser.update({
        where: {
            id
        },
        data: {
            role: data.role
        }
    })
}