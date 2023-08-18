import { client } from "@/lib/clickhouse";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const getWebsite = async () => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("User not found");
    }
    const userWebsites = await db.website.findMany({
        where: {
            userId: user.id,
        },
    });

    const ids = userWebsites.map((website) => website.id);
    const teamWebsites = await db.teamWebsite.findMany({
        where: {
            Team: {
                AND: {
                    TeamUser: {
                        some: {
                            userId: user.id,
                            accepted: true,
                        },
                    },
                    TeamWebsite: {
                        some: {
                            websiteId: {
                                notIn: ids,
                            },
                        },
                    },
                },
            },
        },
        include: {
            Website: true,
        },
    });
    const sites = userWebsites.map(async (web) => {
        const before24Hour = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        const sessionsCount = await client.query({
            query: `select visitorId as id from loglib.event where websiteId='${web.id
                }' AND timestamp >= '${before24Hour.toISOString().slice(0, 19).replace("T", " ")}'`,
            format: "JSONEachRow",
        });
        const s = (await sessionsCount.json()) as { id: string }[];
        return {
            ...web,
            visitors: new Set(s.map((l) => l.id)).size,
        };
    });

    const teamSites = teamWebsites.map(async (web) => {
        const before24Hour = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        const sessionsCount = await client.query({
            query: `select visitorId as id from loglib.event where websiteId='${web.Website.id
                }' AND timestamp >= '${before24Hour.toISOString().slice(0, 19).replace("T", " ")}'`,
            format: "JSONEachRow",
        });
        const s = (await sessionsCount.json()) as { id: string }[];
        return {
            ...web.Website,
            visitors: new Set(s.map((l) => l.id)).size,
        };
    });

    return {
        teamWebsites: await Promise.all(teamSites),
        userWebsites: await Promise.all(sites),
    };
};

export type Websites = Awaited<ReturnType<typeof getWebsite>>;
