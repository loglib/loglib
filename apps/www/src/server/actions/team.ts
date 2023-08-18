"use server";

import { ROLE } from "@prisma/client";
import { z } from "zod";

import { TeamInviteEmail } from "@/components/emails/team-invite-email";
import { siteConfig } from "@/config/site";
import { resend } from "@/lib/resend";

import { db } from "../../lib/db";
import { teamInviteSchema, teamSchema } from "../../lib/validations/team";
import { protectedAction } from "../utils/middleware";

export async function createTeam(data: z.infer<typeof teamSchema>) {
    return await protectedAction(async (user) => {
        const team = await db.team.create({
            data: {
                name: data.name,
                TeamUser: {
                    create: {
                        userId: user.id,
                        role: "owner",
                        accepted: true,
                    },
                },
            },
        });
        return team;
    });
}

export async function inviteTeam(
    data: z.infer<typeof teamInviteSchema>,
    teamId: string,
    toResend?: boolean,
) {
    return await protectedAction(
        async (user) => {
            const team = await db.team.findUnique({
                where: {
                    id: teamId,
                },
            });
            if (!team) {
                throw new Error("Team not found");
            }
            const inviteToken =
                Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
            const invitedUser = await db.user.findUnique({
                where: {
                    email: data.email,
                },
            });
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
                    from: "no-reply@loglib.io",
                });
            };
            const invites = await db.teamUserInvite.findMany({
                where: {
                    teamId,
                    createdAt: {
                        gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                    },
                },
            });
            if (invites.length > 3) {
                throw new Error("Invite limit reached.");
            }
            if (invitedUser) {
                if (toResend) {
                    const teamUser = await db.teamUser.findFirst({
                        where: {
                            userId: invitedUser.id,
                            teamId: teamId,
                        },
                    });
                    if (teamUser) {
                        await db.teamUserInvite.updateMany({
                            where: {
                                teamId,
                                userId: invitedUser.id,
                            },
                            data: {
                                status: "expired",
                            },
                        });
                        await db.teamUserInvite.create({
                            data: {
                                teamId,
                                userId: invitedUser.id,
                                teamUserId: teamUser?.id,
                                token: inviteToken,
                            },
                        });
                    } else {
                        throw new Error("Team user doesn't exists");
                    }
                    return await sendEmail();
                } else {
                    const teamUser = await db.teamUser
                        .create({
                            data: {
                                teamId,
                                userId: invitedUser.id,
                                role: data.role,
                                accepted: false,
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
                                    },
                                },
                            },
                        })
                        .then((res) => ({
                            ...res,
                            name: res.User.name,
                            email: res.User.email,
                        }));
                    await db.teamUserInvite.create({
                        data: {
                            teamId,
                            userId: invitedUser.id,
                            teamUserId: teamUser.id,
                            token: inviteToken,
                        },
                    });
                    await sendEmail();
                    return teamUser;
                }
            } else {
                return null;
            }
        },
        {
            role: ["admin", "owner"],
            teamId,
        },
    );
}

export async function leaveTeam(data: {
    teamId: string;
    userId: string;
    deleteTeam: boolean;
}) {
    return await protectedAction(
        async () => {
            if (data.deleteTeam) {
                await db.team.delete({
                    where: {
                        id: data.teamId,
                    },
                });
            }
            await db.teamUser.deleteMany({
                where: {
                    teamId: data.teamId,
                    userId: data.userId,
                },
            });
            return true;
        },
        {
            role: ["owner", "viewer", "admin"],
            teamId: data.teamId,
        },
    );
}

export async function updateTeam(data: z.infer<typeof teamSchema>, id: string) {
    return await protectedAction(
        async () => {
            const res = await db.team.update({
                where: {
                    id,
                },
                data: {
                    name: data.name,
                },
                include: {
                    TeamWebsite: {
                        include: {
                            Website: {
                                select: {
                                    id: true,
                                    title: true,
                                },
                            },
                        },
                    },
                },
            });
            return res;
        },
        {
            role: ["owner", "admin"],
            teamId: id,
        },
    );
}

export const removeTeamUser = async (id: string, teamId: string) => {
    protectedAction(
        async () => {
            await db.teamUser.delete({
                where: {
                    id,
                },
            });
        },
        {
            role: ["owner", "admin"],
            teamId,
        },
    );
};

export const addWebsiteToTeam = async (teamId: string, websiteId: string) => {
    return await protectedAction(
        async () => {
            const isWebsiteAlreadyAdded = await db.teamWebsite.findFirst({
                where: {
                    AND: {
                        teamId,
                        websiteId,
                    },
                },
            });
            if (isWebsiteAlreadyAdded) {
                return null;
            }
            await db.teamWebsite.deleteMany({
                where: {
                    teamId,
                },
            });
            const res = await db.teamWebsite.create({
                data: {
                    teamId,
                    websiteId,
                },
            });
            return res;
        },
        {
            role: ["owner"],
            teamId,
        },
    );
};

export const removeAllTeamWebsites = async (teamId: string) => {
    return await protectedAction(
        async () => {
            await db.teamWebsite.deleteMany({
                where: {
                    teamId,
                },
            });
            return true;
        },
        {
            role: ["owner"],
            teamId,
        },
    );
};

export const updateTeamUser = async (id: string, data: { role?: ROLE }, teamId: string) => {
    protectedAction(
        async () => {
            await db.teamUser.update({
                where: {
                    id,
                },
                data: {
                    role: data.role,
                },
            });
        },
        {
            role: ["owner", "admin"],
            teamId,
        },
    );
};
