import { db } from "@/lib/db"

export const getWebsite = async (userId: string) => {
    const website = await db.website.findMany({
        where: {
            userId: userId,
        },
        include: {
            WebSession: {
                distinct: ["visitorId"],
                where: {
                    createdAt: {
                        gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                    },
                },
                select: {
                    id: true,
                },
            },
        },
    })
    const ids = website.map((website) => website.id)
    const teamWebsites = await db.teamWebsite.findMany({
        where: {
            Team: {
                AND: {
                    TeamUser: {
                        some: {
                            userId: userId,
                        },
                    },
                    TeamWebsite: {

                        some: {
                            websiteId: {
                                notIn: ids
                            }
                        }
                    }
                }

            },
        },
        include: {
            Website: {
                include: {
                    WebSession: {
                        distinct: ["visitorId"],
                        where: {
                            createdAt: {
                                gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
                            },
                        },
                        select: {
                            id: true,
                        },
                    },
                },
            },
        },
    })
    const websites = [
        website,
        teamWebsites.map((teamWebsite) => ({
            ...teamWebsite.Website,
        }))
    ].reduce((acc, val) => acc.concat(val), [])
    return websites
}

export type Websites = Awaited<ReturnType<typeof getWebsite>>