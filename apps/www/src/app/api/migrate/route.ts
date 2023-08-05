import { db } from "@/lib/db";
import { createClient } from "@clickhouse/client";
import { env } from "env.mjs";
import fs from "fs";
export const POST = async (req: Request) => {
    const body = await req.json();
    const table = body.table;
    if (table === "clickhouse") {
        const client = createClient({
            host: env.CLICKHOUSE_HOST,
            password: env.CLICKHOUSE_PASSWORD,
        });
        const sessions = await db.webSession.findMany();
        const pageViews = await db.webPageview.findMany();
        const merged = pageViews.map((pageview) => {
            const session = sessions.find((p) => p.id === pageview.sessionId);
            if (!session) {
                return {};
            }
            return {
                websiteId: session?.websiteId,
                sessionId: session?.id,
                timestamp: pageview.createdAt.toISOString().slice(0, 19).replace("T", " "),
                visitorId: session?.visitorId,
                language: session?.language,
                browser: session?.browser,
                referrer: session?.referrer,
                page: pageview.page,
                queryParams: pageview.queryParams,
                country: session?.country,
                city: session?.city,
                os: session?.os,
                device: session?.device,
                duration: pageview.duration,
                id: pageview?.id,
                referrerPath: pageview?.referrer,
            };
        });
        const x = merged
            .map((d) => ({
                id: d.id,
                event: "hits",
                websiteId: d.websiteId,
                sessionId: d.sessionId,
                visitorId: d.visitorId,
                timestamp: d.timestamp,
                properties: JSON.stringify({
                    language: d.language,
                    browser: d.browser,
                    referrerPath: d.referrerPath,
                    referrerDomain: d.referrer,
                    currentPath: d.page,
                    queryParams: d.queryParams,
                    country: d.country,
                    city: d.city,
                    os: d.os,
                    device: d.device,
                    duration: d.duration,
                }),
                sign: 1,
            }))
            .filter((d) => d.id);
        console.log(x.length);
        console.log("clickhouse started");
        await client
            .insert({
                table: "loglib.event",
                values: x,
                format: "JSONEachRow",
            })
            .then((res) => console.log(res));
        return new Response("OK");
    }
    if (table === "session") {
        const sessions = await db.webSession.findMany();
        const pageViews = await db.webPageview.findMany();
        const merged = sessions.map((session) => {
            const pageview = pageViews.find((p) => p.sessionId === session.id);
            return {
                ...session,
                ...pageview,
            };
        });
        const data = merged.map((d) => ({
            timestamp: d.createdAt,
            action: "page_hit",
            sessionId: d.sessionId,
            visitorId: d.visitorId,
            payload: {
                locale: d.language,
                browser: d.browser,
                referrer: d.referrer,
                pathname: d.page,
                queryParams: d.queryParams,
                country: d.country,
                city: d.city,
                os: d.os,
                device: d.device,
                duration: d.duration,
            },
        }));
        const ndjson = data.map((session) => JSON.stringify(session) + "\n").join("");
        fs.writeFileSync("sessions.ndjson", ndjson);
        return new Response("OK");
    }
    if (table === "pages") {
        const now = new Date();
        const before23h = new Date(now.getTime() - 23 * 60 * 60 * 1000);
        const pages = await db.webPageview.findMany({
            where: {
                createdAt: {
                    gte: before23h,
                },
            },
        });
        const lastpages = await db.webPageview.findMany({
            where: {
                createdAt: {
                    lte: before23h,
                },
            },
        });
        console.log(pages.length, lastpages.length);
        const ndjson = pages.map((session) => JSON.stringify(session) + "\n").join("");
        fs.writeFileSync("pageviews.ndjson", ndjson);
        return new Response("OK");
    }
    if (table === "pagesDurations") {
        const now = new Date();
        const before23h = new Date(now.getTime() - 23 * 60 * 60 * 1000);
        const pages = await db.webPageview.findMany().then((res) =>
            res.map((r) => ({
                duration: r.duration,
                sessionId: r.sessionId,
                pageId: r.id,
                timestamp: r.createdAt,
                websiteId: r.websiteId,
            })),
        );
        const lastpages = await db.webPageview.findMany();
        const ndjson = pages.map((session) => JSON.stringify(session) + "\n").join("");
        fs.writeFileSync("pagedurations.ndjson", ndjson);
        return new Response("OK");
    }
};
