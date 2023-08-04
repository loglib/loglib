import { db } from "@/lib/db";
import { createClient } from "@clickhouse/client";
import fs from "fs";
export const POST = async (req: Request) => {
    const body = await req.json();
    const table = body.table;
    if (table === "clickhouse") {
        const client = createClient({
            host: "http://49.12.238.229:8123/",
            password: "Klc7-klc7",
        });
        const exDa = await client.query({
            query: "SELECT * FROM event LIMIT 10",
            format: "JSONEachRow",
        });
        const d = (await exDa.json()) as {
            timestamp: string;
            event: string;
            properties: string;
            id: string;
        }[];
        d.map((e) => {
            console.log(e.id);
        });
        const sessions = await db.webSession.findMany();
        const pageViews = await db.webPageview.findMany();
        const merged = sessions.map((session) => {
            const pageview = pageViews.find((p) => p.sessionId === session.id);
            return {
                ...session,
                ...pageview,
            };
        });
        const x = merged.map((d) => ({
            timestamp: d.createdAt.toISOString().slice(0, 19).replace("T", " "),
            event: "pageview",
            websiteId: d.websiteId,
            id: d.visitorId,
            properties: JSON.stringify({
                sessionId: d.id,
                visitorId: d.visitorId,
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
            }),
        }));
        console.log(x.length);
        await client
            .insert({
                table: "event",
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
