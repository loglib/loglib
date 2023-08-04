import { z } from "zod";
import { apiResponse } from "../lib/api-response";
import { RouteType } from "./type";
import { setVisitorId } from "../lib/set-visitor-id";
import { browserName, detectOS } from "detect-browser";

export const eventSchema = z.object({
    data: z.array(
        z.object({
            id: z.string(),
            eventName: z.string(),
            eventType: z.string(),
            payload: z.record(z.any()).optional(),
            page: z.string(),
        }),
    ),
    pageId: z.string(),
    sessionId: z.string(),
    visitorId: z.string().optional(),
    websiteId: z.string(),
});

export const createEvents: RouteType = async ({ rawBody, headers, client }) => {
    const body = eventSchema.safeParse(rawBody);
    if (body.success) {
        const ipAddress = headers.get("cf-connecting-ip") as string;
        const { visitorId, websiteId, sessionId, data, pageId } = body.data;
        const session = await client
            .query({
                query: `select * from loglib.event where sessionId = '${sessionId}' limit 1`,
                format: "JSONEachRow",
            })
            .then(async (res) => await res.json());
        const city = (headers.get("cf-ipcity") as string) ?? "unknown";
        const country = (headers.get("cf-ipcountry") as string) ?? "unknown";
        const userAgent = (headers.get("user-agent") as string) ?? "unknown";
        const browser = browserName(userAgent) ?? "unknown";
        const os = detectOS(userAgent) ?? "Mac OS";
        if (!session[0])
            return {
                data: { message: "session not found" },
                status: 200,
            };
        const properties = JSON.parse(session[0].properties);
        const device = properties.device ?? "desktop";
        const language = properties.language ?? "en";
        const queryParams = properties.queryParams;
        const referrerPath = properties.referrerPath;
        const referrerDomain = properties.referrerDomain ?? "unknown";
        data.map(async (event) => {
            await client.insert({
                table: "loglib.event",
                values: {
                    id: event.id,
                    sessionId,
                    visitorId: setVisitorId(visitorId, ipAddress),
                    websiteId,
                    event: event.eventName ?? "custom",
                    properties: JSON.stringify({
                        payload: event.payload ?? {},
                        currentPath: event.page,
                        referrerPath,
                        referrerDomain,
                        type: event.eventType,
                        queryParams,
                        pageId,
                        city,
                        country,
                        browser,
                        os,
                        device,
                        language,
                    }),
                    sign: 1,
                },
                format: "JSONEachRow",
            });
        });
        return {
            data: {
                message: "successfully created events",
            },
            status: 200,
        };
    } else {
        return apiResponse.badRequest;
    }
};
