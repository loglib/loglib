import { z } from "zod";
import { apiResponse } from "../lib/api-response";
import { publishEvents } from "../lib/tinybird";
import { RouteType } from "./type";
import { setVisitorId } from "../lib/set-visitor-id";

export const eventSchema = z.object({
    data: z.array(
        z.object({
            id: z.string(),
            eventName: z.string(),
            eventType: z.string(),
            payload: z.record(z.any()),
            page: z.string(),
        }),
    ),
    pageId: z.string(),
    sessionId: z.string(),
    visitorId: z.string().optional(),
    websiteId: z.string(),
});

export const createEvents: RouteType = async ({ rawBody, headers, tb }) => {
    const body = eventSchema.safeParse(rawBody);
    if (body.success) {
        const ipAddress = headers.get("cf-connecting-ip") as string;
        const { visitorId, websiteId, sessionId, pageId, data } = body.data;
        const userId = setVisitorId(visitorId, ipAddress);
        data.map(async (event) => {
            await publishEvents(tb)({
                id: event.id,
                createdAt: new Date().toISOString(),
                eventName: event.eventName,
                eventType: event.eventType,
                payload: JSON.stringify(event.payload),
                pageId,
                sessionId,
                visitorId: userId,
                websiteId,
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
