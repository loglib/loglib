import { createClient } from "@clickhouse/client-web";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { convertDate } from "./lib/utils";
import { getInsight } from "./routes/insight";
import { getTablesData } from "./routes/table";
import { Filter, LoglibEvent, Path } from "./type";
import { router } from "./routes";
import { envSchema, insightSchema } from "./schema";
import { customEventsQuery, getDataQuery } from "./lib/db/clickhouse";
import { filter } from "./lib/small-filter";
import { retryFunction } from "./lib/retry";
//-> pageId -> Distinct Id , duration -

const app = new Hono();

app.use("*", cors());

app.post("/", async (c) => {
    const env = envSchema.parse(c.env);
    const body = await c.req.json();
    if (!body.path) {
        return c.json(null, 200);
    }
    const client = createClient({
        host: env.CLICKHOUSE_HOST,
        password: env.CLICKHOUSE_PASSWORD,
    });
    const path: Path = body.path;
    const res = await router({ path, rawBody: body, client, headers: c.req.headers, query: {} });
    if (res.status !== 200) {
        console.log(path, res.status, body.data);
    }
    return c.json(JSON.stringify(res.data), res.status);
});

app.get("/", async (c) => {
    const env = envSchema.parse(c.env);
    const queries = insightSchema.safeParse(c.req.query());
    if (!queries.success) {
        console.log(queries);
        return c.json(null, 400);
    }
    const { startDate, endDate, timeZone, websiteId } = queries.data;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const duration = endDateObj.getTime() - startDateObj.getTime();
    const pastEndDateObj = new Date(startDateObj.getTime() - duration);
    const client = createClient({
        host: env.CLICKHOUSE_HOST,
        password: env.CLICKHOUSE_PASSWORD,
    });
    try {
        let [events, lastEvents] = await retryFunction(
            getDataQuery,
            [client, startDateObj, endDateObj, pastEndDateObj, websiteId],
            3,
            4,
        );
        const filters = JSON.parse(queries.data.filter) as Filter<LoglibEvent>[];
        filters.length &&
            filters.forEach((f) => {
                events = filter(events).where(f.key, f.operator, f.value).execute();
                lastEvents = filter(lastEvents as LoglibEvent[])
                    .where(f.key, f.operator, f.value)
                    .execute();
            });
        const insightData = getInsight(events as LoglibEvent[], lastEvents as LoglibEvent[]);
        const tableData = getTablesData(
            events as LoglibEvent[],
            startDateObj,
            endDateObj,
            timeZone,
        );
        return c.json(
            {
                insight: insightData,
                ...tableData,
            },
            200,
        );
    } catch (e) {
        console.log(e);
    }
});

//TODO: should be changed the json to be parsed from clickhouse than js
app.get("/events", async (c) => {
    const env = envSchema.parse(c.env);
    const startDateObj = new Date(c.req.query("startDate"));
    const endDateObj = new Date(c.req.query("endDate"));
    const websiteId = c.req.query("websiteId");
    const client = createClient({
        host: env.CLICKHOUSE_HOST,
        password: env.CLICKHOUSE_PASSWORD,
    });
    try {
        const res = await client
            .query({
                query: customEventsQuery(
                    convertDate(startDateObj),
                    convertDate(endDateObj),
                    websiteId,
                ),
                format: "JSONEachRow",
            })
            .then(async (res) => await res.json())
            .catch((e) => console.log(e));
        type EventRes = {
            id: string;
            event: string;
            sessionId: string;
            visitorId: string;
            properties: string;
            timestamp: string;
            websiteId: string;
        };
        console.log(startDateObj, endDateObj);
        const events = (res as EventRes[])
            .map((s) => {
                const properties = JSON.parse(s.properties);
                return {
                    id: s.id,
                    event: s.event,
                    sessionId: s.sessionId,
                    websiteId: s.websiteId,
                    visitorId: s.visitorId,
                    timestamp: s.timestamp,
                    ...properties,
                };
            })
            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        return c.json(events, 200);
    } catch {
        return c.json(null, 500);
    }
});

// app.get("/is-website-active", async (c) => {
//     const websiteId = c.req.query("websiteId");
//     if (!websiteId) {
//         return c.json({ message: "Website id is required" }, 400);
//     }
//     const env = envSchema.parse(c.env);
//     const tb = new Tinybird({ token: env.TINYBIRD_TOKEN });
//     const result = await getIsWebsiteActive(tb)({ websiteId });
//     if (result.data.length) {
//         return c.json({ active: true }, 200);
//     }
//     return c.json({ active: false }, 200);
// });

//api/v1
// app.use("/v1/*", async (c, next) => {
//     const apiKey = c.req.headers.get("x-api-key");
//     if (!apiKey) {
//         return c.json({ message: "Unauthorized" }, 401);
//     }
//     const env = envSchema.parse(c.env);
//     const db = getDb({
//         host: env.DATABASE_HOST,
//         password: env.DATABASE_PASSWORD,
//         username: env.DATABASE_USERNAME,
//     });
//     const site = await db
//         .selectFrom("api_key")
//         .selectAll()
//         .where("key", "=", apiKey)
//         .executeTakeFirst();
//     if (!site) {
//         return c.json({ message: "Unauthorized" }, 401);
//     }
//     const query = c.req.query();
//     const data = apiQuery.safeParse(query);
//     if (!data.success) {
//         return c.json({ message: "Bad request" }, 400);
//     }
//     c.env.websiteId = site.websiteId;
//     return await next();
// });

// app.get("/v1/session", async (c) => {
//     const query = c.req.query();
//     console.log(query);
//     const data = apiQuery.parse(query);
//     const env = envSchema.parse(c.env);
//     const websiteId = c.env.websiteId as string;
//     const tb = new Tinybird({ token: env.TINYBIRD_TOKEN });
//     const sessions = await getSessionsEndpoint(tb)({
//         websiteId: websiteId,
//         startDate: new Date(data.startDate).toISOString(),
//         endDate: new Date(data.endDate).toISOString(),
//     });
//     return c.json(sessions, 200);
// });

// app.get("/v1/pageview", async (c) => {
//     const query = apiQuery.parse(c.req.query());
//     const env = envSchema.parse(c.env);
//     const websiteId = c.env.websiteId as string;
//     const tb = new Tinybird({ token: env.TINYBIRD_TOKEN });
//     const pageview = await getPageViewsEndpoint(tb)({
//         websiteId: websiteId,
//         startDate: new Date(query.startDate).toISOString(),
//         endDate: new Date(query.endDate).toISOString(),
//     });
//     return c.json(pageview, 200);
// });

// app.get("/v1/events", async (c) => {
//     const query = apiQuery.parse(c.req.query());
//     const env = envSchema.parse(c.env);
//     const websiteId = c.env.websiteId as string;
//     const tb = new Tinybird({ token: env.TINYBIRD_TOKEN });
//     const events = await getEventsEndpoint(tb)({
//         websiteId: websiteId,
//         startDate: new Date(query.startDate).toISOString(),
//         endDate: new Date(query.endDate).toISOString(),
//     });
//     return c.json(events, 200);
// });

export default app;
