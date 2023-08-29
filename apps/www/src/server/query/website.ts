import { client } from "@/lib/clickhouse";
import { db } from "@/lib/drizzle";
import { getCurrentUser } from "@/lib/session";
import { notInArray } from "drizzle-orm";

export const getWebsite = async () => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("User not found");
    }
    const userWebsites = await db.query.website.findMany({
        where(fields, operators) {
            return operators.eq(fields.userId, user.id)
        }
    })
    const ids = userWebsites.map((website) => website.id);
    const teamWebsites = await db.query.teamMember.findMany({
        where(fields, operators) {
            return operators.and(
                operators.eq(fields.userId, user.id),
                operators.eq(fields.accepted, true),
                notInArray(fields.websiteId, ids.length ? ids : ["0"])
            )
        },
        with: {
            team: true,
            website: true
        }
    })

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
            query: `select visitorId as id from loglib.event where websiteId='${web.website?.id
                }' AND timestamp >= '${before24Hour.toISOString().slice(0, 19).replace("T", " ")}'`,
            format: "JSONEachRow",
        });
        const s = (await sessionsCount.json()) as { id: string }[];
        return {
            ...web.website,
            visitors: new Set(s.map((l) => l.id)).size,
        };
    });

    return {
        teamWebsites: await Promise.all(teamSites),
        userWebsites: await Promise.all(sites),
    };
};

export type Websites = Awaited<ReturnType<typeof getWebsite>>;
