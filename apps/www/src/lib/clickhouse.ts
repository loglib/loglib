import { createClient } from "@clickhouse/client";
import { env } from "env.mjs";

const client = createClient({
    host: env.CLICKHOUSE_HOST,
    password: env.CLICKHOUSE_PASSWORD,
});

export const getIsWebsiteActive = async ({ websiteId }: { websiteId: string }) =>
    await client
        .query({
            query: `select id from loglib.event where websiteId = '${websiteId}' limit 1`,
            format: "JSONEachRow",
        })
        .then(async (res) => (await res.json()) as { id: string }[]);
