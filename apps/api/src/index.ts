import { serve } from "@hono/node-server";
import { VitalData } from "@loglib/types/tracker";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { eventDB } from "./db";
import { client } from "./db/clickhouse";
import { db } from "./db/drizzle";
import { hitsQuery } from "./db/queries";
import { checkUsage } from "./lib/check-usage";
import { detect } from "./lib/detect";
import { mail } from "./lib/email";
import { rateLimitCheck } from "./lib/rate-limit";
import { retryFunction } from "./lib/retry";
import { filter } from "./lib/small-filter";
import { convertToUTC } from "./lib/utils";
import { router } from "./routes";
import { getInsight } from "./routes/insight";
import { getTablesData } from "./routes/table";
import { getVitalsData } from "./routes/vital-graph-table";
import { getVitalInsight } from "./routes/vital-insight";
import { apiQuery, ingestQuerySchema, insightPubApiSchema, insightSchema } from "./schema";
import { Filter, LoglibEvent, Path } from "./type";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());

app.post("/", async (c) => {
    const body = await c.req.json();
    const headers = Object.fromEntries(c.req.headers);
    const query = c.req.query();
    if (!body.path) {
        return c.json(null, 200);
    }
    const path: Path = body.path;
    const res = await router({ path, rawBody: body, req: { headers, query } });
    return c.json(null, res.status);
});
app.post("/vitals", async (c) => {
    const body = await c.req.json<VitalData[]>();
    const headers = Object.fromEntries(c.req.headers);
    const query = c.req.query();
    const sessionData = await detect({ headers, query }, body[0].screenWidth);
    const usage = checkUsage(body[0].websiteId);
    if (!usage) {
        return c.json(null, 403);
    }
    await eventDB.insertEvents(
        body.map((data) => {
            const { sessionId, visitorId, id, websiteId, ...rest } = data;
            return {
                properties: JSON.stringify({
                    ...sessionData,
                    ...rest,
                }),
                timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
                event: "vitals",
                sessionId,
                visitorId,
                websiteId,
                id: id,
                sign: 1,
            };
        }),
    );
    return c.json(null, 200);
});

app.get("/vitals", async (c) => {
    const startDateObj = new Date(c.req.query("startDate"));
    const endDateObj = new Date(c.req.query("endDate"));
    const duration = endDateObj.getTime() - startDateObj.getTime();
    const pastEndDateObj = new Date(startDateObj.getTime() - duration);
    const websiteId = c.req.query("websiteId");
    const timezone = c.req.query("timezone");
    try {
        const [events, lastEvents] = await retryFunction(
            eventDB.getVital,
            [startDateObj, endDateObj, pastEndDateObj, websiteId],
            3,
            4,
        );
        const insight = getVitalInsight(events, lastEvents);
        const vitalsData = getVitalsData(events, startDateObj, endDateObj, timezone);
        return c.json(
            {
                ...insight,
                graph: vitalsData.dataByDate,
                data: vitalsData.data,
            },
            200,
        );
    } catch (e) {
        console.error(e);
        return c.json(null, 500);
    }
});

app.get("/", async (c) => {
    //authentication
    const queries = insightSchema.safeParse(c.req.query());
    if (!queries.success) {
        return c.json(null, 400);
    }
    const { startDate, endDate, timeZone, websiteId, token } = queries.data;
    try {
        jwt.verify(token, env.NEXTAUTH_SECRET, (err, decoded) => {
            if (err) {
                throw err;
            }
            //@ts-ignore
            if (decoded.website !== websiteId) {
                throw Error;
            }
        });
    } catch {
        return c.json(null, 401);
    }
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const duration = endDateObj.getTime() - startDateObj.getTime();
    const pastEndDateObj = new Date(startDateObj.getTime() - duration);
    try {
        const tick = performance.now();
        let [events, lastEvents] = await retryFunction(
            eventDB.getHits,
            [startDateObj, endDateObj, pastEndDateObj, websiteId],
            3,
            4,
        );

        const tack = performance.now();
        console.log(tack - tick, "ms taken to query");
        const filters = JSON.parse(queries.data.filter) as Filter<LoglibEvent>[];
        //add utm as a key in session
        events = events.map((s) => {
            const queryParams = JSON.parse(s.queryParams);
            const utmCampaign = queryParams?.utm_campaign ?? "";
            const utmSource = queryParams?.utm_source ?? "";
            return { ...s, utmCampaign, utmSource };
        });

        //add utm as a key in session
        lastEvents = lastEvents.map((s) => {
            const queryParams = JSON.parse(s.queryParams);
            const utmCampaign = queryParams?.utm_campaign ?? "";
            const utmSource = queryParams?.utm_source ?? "";
            return { ...s, utmCampaign, utmSource };
        });

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
        return c.json(e, 500);
    }
});

//TODO: should be changed the json to be parsed from clickhouse than js
app.get("/events", async (c) => {
    const startDateObj = new Date(c.req.query("startDate"));
    const endDateObj = new Date(c.req.query("endDate"));
    const websiteId = c.req.query("websiteId");
    try {
        const res = await eventDB.getCustomEvents(startDateObj, endDateObj, websiteId);
        const events = res.sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        );
        return c.json(events, 200);
    } catch {
        return c.json(null, 500);
    }
});

app.post("/send-ingest", async (c) => {
    const body = await c.req.json();
    const data = ingestQuerySchema.parse(body);
    const apiKey = c.req.headers.get("x-api-key");
    if (apiKey !== env.NEXTAUTH_SECRET) {
        return c.json(null, 500);
    }
    const today = new Date();
    const before30Days = new Date();
    before30Days.setMonth(before30Days.getMonth() - 1);
    const startDate = data.startDate ? new Date(body.startDate) : before30Days;
    const endDate = data.endDate ? new Date(body.endDate) : today;
    const duration = endDate.getTime() - startDate.getTime();
    const pastEndDate = new Date(startDate.getTime() - duration);
    try {
        const website = await db.query.website.findFirst({
            where(fields, operators) {
                return operators.eq(fields.id, data.websiteId);
            },
        });
        const tick = performance.now();
        const [events, lastEvents] = await retryFunction(
            eventDB.getHits,
            [startDate, endDate, pastEndDate, data.websiteId],
            3,
            4,
        );
        const tack = performance.now();
        console.log(tack - tick, "ms taken to query");
        const insightData = getInsight(events as LoglibEvent[], lastEvents as LoglibEvent[]);
        const tableData = getTablesData(events as LoglibEvent[], startDate, endDate, data.timezone);
        await mail
            .sendIngestedEmail({
                to: data.email,
                website: website,
                stats: insightData,
                topPages: tableData.data.pages.slice(0, 5),
            })
            .then((res) => console.log(res));
        return c.json(
            {
                insight: insightData,
            },
            200,
        );
    } catch (e) {
        console.log(e);
        return c.json(e, 500);
    }
});

//api/v1
app.use("/v1/*", async (_, next) => {
    return await next();
});

app.get("/v1/hits", async (c) => {
    const query = c.req.query();
    const apiKey = c.req.headers.get("x-api-key");
    if (!apiKey) {
        return c.json({ message: "Unauthorized" }, 401);
    }
    const site = await db.query.apiKey.findFirst({
        where(fields, operators) {
            return operators.and(operators.eq(fields.token, apiKey));
        },
    });
    if (!site) {
        return c.json({ message: "Unauthorized" }, 401);
    }
    const data = apiQuery.safeParse(query);
    if (!data.success) {
        return c.json({ message: "Bad request" }, 400);
    }
    const { startDate, endDate } = data.data;
    const websiteId = site.websiteId;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    async function getData() {
        return await client
            .query({
                query: hitsQuery(convertToUTC(startDateObj), convertToUTC(endDateObj), websiteId),
                format: "JSONEachRow",
            })
            .then(async (res) => (await res.json()) as LoglibEvent[]);
    }
    const res = await retryFunction(getData, [], 3, 4);
    return c.json(res, 200);
});

app.get("/v1/insight", async (c) => {
    const queries = insightPubApiSchema.safeParse(c.req.query());
    if (!queries.success) {
        return c.json(null, 400);
    }
    const { startDate, endDate, timeZone } = queries.data;
    const apiKey = queries.data.apiKey;
    const isRateLimited = await rateLimitCheck(apiKey);
    if (isRateLimited) {
        return c.json(
            {
                message: "Rate limit exceeded",
            },
            429,
        );
    }
    const site = await db.query.apiKey.findFirst({
        where(fields, operators) {
            return operators.and(operators.eq(fields.token, apiKey));
        },
    });
    const now = new Date().getTime();
    const expiresAt = site.expiresAt.getTime();
    if (now > expiresAt) {
        return c.json(
            {
                message: "API key expired!",
            },
            400,
        );
    }
    if (!site) {
        return c.json(
            {
                message: "Unauthorized",
            },
            401,
        );
    }
    const websiteId = site.websiteId;
    const today = new Date();
    const startDateObj = new Date(
        startDate ??
            new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()).toISOString(),
    );
    const endDateObj = new Date(endDate ?? today);
    const duration = endDateObj.getTime() - startDateObj.getTime();
    const pastEndDateObj = new Date(startDateObj.getTime() - duration);
    try {
        const tick = performance.now();
        let [events, lastEvents] = await retryFunction(
            eventDB.getHits,
            [startDateObj, endDateObj, pastEndDateObj, websiteId],
            3,
            4,
        );
        const tack = performance.now();
        console.log(tack - tick, "ms taken to query");
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
        return c.json(e, 500);
    }
});

serve(
    {
        fetch: app.fetch,
        port: 8000,
    },
    (info) => {
        console.log("listening on port: ", info.port);
    },
);
