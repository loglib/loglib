import { getDb } from "./lib/db";
import { getEventsEndpoint, getPageViewsEndpoint, getSessionsEndpoint } from "./lib/tinybird";
import { router } from "./routes";
import { apiQuery, envSchema } from "./schema";
import { Path } from "./type";
import { Tinybird } from "@chronark/zod-bird";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", cors());
app.all("*", async (c, next) => {
    const env = envSchema.safeParse(c.env);
    if (!env.success) {
        return c.json(null, 500);
    }
    return await next();
});

app.post("/", async (c) => {
    const body = await c.req.json();
    const env = envSchema.parse(c.env);
    if (!body.path) {
        return c.json(null, 200);
    }
    const tb = new Tinybird({ token: env.TINYBIRD_TOKEN });
    const path: Path = body.path;
    const res = await router({ path, rawBody: body, tb, headers: c.req.headers, query: {} });
    return c.json(JSON.stringify(res.data), res.status);
});

app.get("/", async (c) => {
    const env = envSchema.parse(c.env);
    const tb = new Tinybird({ token: env.TINYBIRD_TOKEN });
    const query = c.req.query();
    const res = await router({
        path: "/insight",
        rawBody: {},
        tb,
        headers: c.req.headers,
        query: query,
    });
    return c.json(res.data, res.status);
});

//api/v1
app.use("/v1/*", async (c, next) => {
    console.log("middleware");
    const apiKey = c.req.headers.get("x-api-key");
    if (!apiKey) {
        return c.json({ message: "Unauthorized" }, 401);
    }
    const env = envSchema.parse(c.env);
    const db = getDb({
        host: env.DATABASE_HOST,
        password: env.DATABASE_PASSWORD,
        username: env.DATABASE_USERNAME,
    });
    const site = await db
        .selectFrom("api_key")
        .selectAll()
        .where("key", "=", apiKey)
        .executeTakeFirst();
    if (!site) {
        return c.json({ message: "Unauthorized" }, 401);
    }
    const query = c.req.query();
    const data = apiQuery.safeParse(query);
    if (!data.success) {
        return c.json({ message: "Bad request" }, 400);
    }
    c.env.websiteId = site.websiteId;
    return await next();
});

app.get("/v1/session", async (c) => {
    const query = c.req.query();
    const data = apiQuery.parse(query);
    const env = envSchema.parse(c.env);
    const websiteId = c.env.websiteId as string;
    const tb = new Tinybird({ token: env.TINYBIRD_TOKEN });
    const sessions = await getSessionsEndpoint(tb)({
        websiteId: websiteId,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
    });
    return c.json(sessions, 200);
});

app.get("/v1/pageview", async (c) => {
    const query = apiQuery.parse(c.req.query());
    const env = envSchema.parse(c.env);
    const websiteId = c.env.websiteId as string;
    const tb = new Tinybird({ token: env.TINYBIRD_TOKEN });
    const pageview = await getPageViewsEndpoint(tb)({
        websiteId: websiteId,
        startDate: new Date(query.startDate).toISOString(),
        endDate: new Date(query.endDate).toISOString(),
    });
    return c.json(pageview, 200);
});

app.get("/v1/events", async (c) => {
    const query = apiQuery.parse(c.req.query());
    const env = envSchema.parse(c.env);
    const websiteId = c.env.websiteId as string;
    const tb = new Tinybird({ token: env.TINYBIRD_TOKEN });
    const events = await getEventsEndpoint(tb)({
        websiteId: websiteId,
        startDate: new Date(query.startDate).toISOString(),
        endDate: new Date(query.endDate).toISOString(),
    });
    return c.json(events, 200);
});

export default app;
