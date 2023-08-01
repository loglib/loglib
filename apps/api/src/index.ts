import { Tinybird } from "@chronark/zod-bird";
import { Hono } from "hono";
import { Path } from "./type";
import { router } from "./routes";
import { envSchema } from "./schema";
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
    const query = new URLSearchParams(c.req.url.split("?")[1]);
    const queryObject = Object.fromEntries(query.entries());
    const res = await router({
        path: "/insight",
        rawBody: {},
        tb,
        headers: c.req.headers,
        query: queryObject,
    });
    return c.json(res.data, res.status);
});

export default app;
