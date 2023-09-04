import { client, getIsWebsiteActive } from "@/lib/clickhouse";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";
import { env } from "env.mjs";

export const getTodayVisitorsCount = (websiteId: string) => {
    const before24Hour = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    return {
        clickhouse: async () => {
            const sessionsCount = await client.query({
                query: `select visitorId as id from loglib.event where websiteId='${websiteId}' AND timestamp >= '${before24Hour
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " ")}'`,
                format: "JSONEachRow",
            });
            const s = (await sessionsCount.json()) as { id: string }[];
            return new Set(s.map((l) => l.id)).size;
        },
        sqlite: async () => {
            const sessionsCount = await db.query.events.findMany({
                where(fields, operators) {
                    return operators.and(
                        operators.eq(fields.websiteId, websiteId),
                        sql` ${fields.timestamp} >= ${before24Hour}`,
                    );
                },
<<<<<<< HEAD:apps/www/src/server/query/queires.ts
            });
            return new Set(sessionsCount.map((l) => l.id)).size;
        },
    };
};

export const isWebsiteActive = (websiteId: string) => ({
    sqlite: async () => {},
    clickhouse: getIsWebsiteActive({ websiteId }),
});
=======
            })
            return new Set(sessionsCount.map((l) => l.id)).size
        }
    }
}

const getTotalEventsCount = async (websiteIds: string[], startDate: Date, endDate: Date) => {
    return {
        clickhouse: async () => {
            websiteIds = ["loglib", "xyz"]
            const sessionsCount = await client.query({
                query: `select * from loglib.event where websiteId IN (${websiteIds.map(w => `'${w}'`)}) AND timestamp >='${startDate.toISOString().slice(0, 19).replace("T", " ")}' AND timestamp <='${endDate.toISOString().slice(0, 19).replace("T", " ")}'`,
                format: "JSONEachRow"
            }).then(async (res) => await res.json() as { event: string }[])
            return {
                pageViews: sessionsCount.filter(s => s.event === "hits").length,
                customEvents: sessionsCount.filter(s => s.event !== "hits").length
            }
        },
        sqlite: async () => {
            //TODO: to be done
            return {
                pageViews: 0,
                customEvents: 0
            }
        }
    }
}


export const isWebsiteActive = (websiteId: string) => ({
    sqlite: async () => {
        //TODO: to be done
    },
    clickhouse: getIsWebsiteActive({ websiteId })
})

>>>>>>> original/main:apps/www/src/server/query/queries.ts

export const DatabaseQueries = (dbType: "clickhouse" | "sqlite") => {
    return {
        getTodayVisitorsCount: async (websiteId: string) => {
            const { sqlite, clickhouse } = getTodayVisitorsCount(websiteId);
            if (dbType === "clickhouse") {
<<<<<<< HEAD:apps/www/src/server/query/queires.ts
                console.log(dbType);
                return await clickhouse();
=======
                return await clickhouse()
            } else {
                return await sqlite()
            }
        },
        getTotalUsageCount: async (websiteIds: string[], startDate: Date, endDate: Date) => {
            const { clickhouse, sqlite } = await getTotalEventsCount(websiteIds, startDate, endDate)
            if (dbType === "clickhouse") {
                return await clickhouse()
>>>>>>> original/main:apps/www/src/server/query/queries.ts
            } else {
                return await sqlite();
            }
        },
        getIsWebsiteActive: async (websiteId: string) => {
            if (dbType === "clickhouse") {
                return await getIsWebsiteActive({ websiteId });
            } else {
                const res = await db.query.events.findMany({
                    where(fields, operators) {
                        return operators.eq(fields.websiteId, websiteId);
                    },
                    columns: {
                        id: true,
                    },
                });
                return res;
            }
        },
    };
};

<<<<<<< HEAD:apps/www/src/server/query/queires.ts
export const queires = DatabaseQueries(env.CLICKHOUSE_HOST ? "clickhouse" : "sqlite");
=======
export const queries = DatabaseQueries(env.CLICKHOUSE_HOST ? "clickhouse" : "sqlite")
>>>>>>> original/main:apps/www/src/server/query/queries.ts
