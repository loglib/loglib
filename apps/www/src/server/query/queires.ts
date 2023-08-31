import { client, getIsWebsiteActive } from "@/lib/clickhouse";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { env } from "env.mjs";

export const getTodayVisitorsCount = (websiteId: string) => {
    const before24Hour = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    return {
        clickhouse: async () => {
            const sessionsCount = await client.query({
                query: `select visitorId as id from loglib.event where websiteId='${websiteId}' AND timestamp >= '${before24Hour.toISOString().slice(0, 19).replace("T", " ")}'`,
                format: "JSONEachRow",
            });
            const s = (await sessionsCount.json()) as { id: string }[];
            return new Set(s.map((l) => l.id)).size
        },
        sqlite: async () => {
            const sessionsCount = await db.query.events.findMany({
                where(fields, operators) {
                    return operators.and(
                        operators.eq(fields.websiteId, websiteId),
                        sql` ${fields.timestamp} >= ${before24Hour}`
                    )
                },
            })
            return new Set(sessionsCount.map((l) => l.id)).size
        }
    }
}


export const isWebsiteActive = (websiteId: string) => ({
    sqlite: async () => {

    },
    clickhouse: getIsWebsiteActive({ websiteId })
})


export const DatabaseQueries = (dbType: "clickhouse" | "sqlite") => {
    return {
        getTodayVisitorsCount: async (websiteId: string) => {
            const { sqlite, clickhouse } = getTodayVisitorsCount(websiteId)
            if (dbType === "clickhouse") {
                console.log(dbType)
                return await clickhouse()
            } else {
                return await sqlite()
            }
        },
        getIsWebsiteActive: async (websiteId: string) => {
            if (dbType === "clickhouse") {
                return await getIsWebsiteActive({ websiteId })
            } else {
                const res = await db.query.events.findMany({
                    where(fields, operators) {
                        return operators.eq(fields.websiteId, websiteId)
                    },
                    columns: {
                        id: true
                    }
                })
                return res
            }
        }
    }
}

export const queires = DatabaseQueries(env.CLICKHOUSE_HOST ? "clickhouse" : "sqlite")