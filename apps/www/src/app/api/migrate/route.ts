import { db } from "@/lib/db";
import fs from "fs";
export const POST = async (req: Request) => {
    const body = await req.json();
    const table = body.table;
    if (table === "session") {
        const sessions = await db.webSession.findMany();
        const ndjson = sessions.map((session) => JSON.stringify(session) + "\n").join("");
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
        const pages = await db.webPageview
            .findMany({
                where: {
                    createdAt: {
                        gte: before23h,
                    },
                },
            })
            .then((res) =>
                res.map((r) => ({
                    duration: r.duration,
                    sessionId: r.sessionId,
                    pageId: r.id,
                    timestamp: r.createdAt,
                })),
            );
        const lastpages = await db.webPageview.findMany({
            where: {
                createdAt: {
                    lte: before23h,
                },
            },
        });
        console.log(pages.length, lastpages.length);
        const ndjson = pages.map((session) => JSON.stringify(session) + "\n").join("");
        fs.writeFileSync("pagedurations.ndjson", ndjson);
        return new Response("OK");
    }
};
