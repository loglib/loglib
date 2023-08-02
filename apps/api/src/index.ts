import { getDb } from "./lib/db";
import {
    getEventsEndpoint,
    getIsWebsiteActive,
    getPageViewsEndpoint,
    getSessionsEndpoint,
} from "./lib/tinybird";
import { router } from "./routes";
import { apiQuery, envSchema } from "./schema";
import { Path } from "./type";
import { Tinybird } from "@chronark/zod-bird";
import jwt from "@tsndr/cloudflare-worker-jwt";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use(
    "*",
    cors({
        origin: "*",
        maxAge: 600,
        allowMethods: ["POST", "GET"],
        exposeHeaders: ["Content-Type", "Authorization", "x-api-key", "Cookie"],
        allowHeaders: ["Content-Type", "Authorization", "x-api-key", "Cookie"],
    }),
);

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
    const query = c.req.query();
    if (!query.websiteId || !query.token) {
        return c.json({ message: "Website id is required" }, 400);
    }
    const token = query.token;
    const isValid = await jwt.verify(token, env.NEXTAUTH_SECRET);
    const { payload } = jwt.decode(token);
    if (!isValid || payload.website !== query.websiteId) {
        return c.json({ message: "Unauthorized" }, 401);
    }
    const tb = new Tinybird({ token: env.TINYBIRD_TOKEN });
    const res = await router({
        path: "/insight",
        rawBody: {},
        tb,
        headers: c.req.headers,
        query: query,
    });
    return c.json(res.data, res.status);
});

app.get("/is-website-active", async (c) => {
    const websiteId = c.req.query("websiteId");
    if (!websiteId) {
        return c.json({ message: "Website id is required" }, 400);
    }
    const env = envSchema.parse(c.env);
    const tb = new Tinybird({ token: env.TINYBIRD_TOKEN });
    const result = await getIsWebsiteActive(tb)({ websiteId });
    if (result.data.length) {
        return c.json({ active: true }, 200);
    }
    return c.json({ active: false }, 200);
});

//api/v1
app.use("/v1/*", async (c, next) => {
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
