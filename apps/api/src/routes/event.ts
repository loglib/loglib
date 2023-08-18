import { apiResponse } from "../lib/api-response";
import { client } from "../lib/db/clickhouse";
import { getIpAddress } from "../lib/detect/get-ip-address";
import { getLocation } from "../lib/detect/get-location";
import { setVisitorId } from "../lib/set-visitor-id";
import { RouteType } from "./type";
import { browserName, detectOS } from "detect-browser";
import { z } from "zod";

export const eventSchema = z.object({
    events: z.array(
        z.object({
            id: z.string(),
            eventName: z.string(),
            eventType: z.string(),
            payload: z.record(z.any()).optional(),
            page: z.string(),
        }),
    ),
    pageId: z.string().optional(),
    sessionId: z.string(),
    visitorId: z.string().optional(),
    websiteId: z.string(),
    duration: z.number().default(0)
});

export const createEvents: RouteType = async ({ rawBody, req }) => {
    const body = eventSchema.safeParse(rawBody);
    console.log(body)
    if (body.success) {
        const ipAddress = getIpAddress(req);
        const { visitorId, websiteId, sessionId, events, pageId, duration } = body.data;
        const session = await client
            .query({
                query: `select * from loglib.event where sessionId = '${sessionId}' limit 1`,
                format: "JSONEachRow",
            })
            .then(async (res) => await res.json());
        const { city, country } = await getLocation(ipAddress, req);
        const userAgent = req.headers["user-agent"] ?? "unknown";
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
        events.map(async (event) => {
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
                        duration,
                        browser,
                        os,
                        device,
                        language,
                    }),
                    sign: 1,
                },
                format: "JSONEachRow",
            }).then(res => console.log(res));
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
