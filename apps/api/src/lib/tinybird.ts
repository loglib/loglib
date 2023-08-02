import { eventSchema, pageviewSchema, sessionSchema, visitorSchema } from "../schema";
import { Tinybird } from "@chronark/zod-bird";
import { z } from "zod";

export const getTb = (token: string) =>
    new Tinybird({
        token,
    });

export const publishVisitor = (tb: Tinybird) =>
    tb.buildIngestEndpoint({
        datasource: "visitors",
        event: visitorSchema,
    });

export const publishSession = (tb: Tinybird) =>
    tb.buildIngestEndpoint({
        datasource: "sessions",
        event: sessionSchema.partial(),
    });

export const publishPageView = (tb: Tinybird) =>
    tb.buildIngestEndpoint({
        datasource: "pageviews",
        event: pageviewSchema.partial(),
    });

export const publishPageDuration = (tb: Tinybird) =>
    tb.buildIngestEndpoint({
        datasource: "page_durations",
        event: z.object({
            timestamp: z.string(),
            duration: z.number(),
            pageId: z.string(),
            sessionId: z.string(),
        }),
    });

export const publishEvents = (tb: Tinybird) =>
    tb.buildIngestEndpoint({
        datasource: "events",
        event: eventSchema,
    });

export const getVisitorsEndpoint = (tb: Tinybird) =>
    tb.buildPipe({
        pipe: "get_website_visitors__v1",
        parameters: z.object({
            websiteId: z.string(),
            startDate: z.string(),
            endDate: z.string(),
        }),
        data: visitorSchema,
    });

export const getSessionsEndpoint = (tb: Tinybird) =>
    tb.buildPipe({
        pipe: "get_website_sessions__v1",
        parameters: z.object({
            websiteId: z.string(),
            startDate: z.string(),
            endDate: z.string(),
        }),
        data: sessionSchema.merge(z.object({ totalDuration: z.number() })),
    });

export const getPageViewsEndpoint = (tb: Tinybird) =>
    tb.buildPipe({
        pipe: "get_website_pageviews__v1",
        parameters: z.object({
            websiteId: z.string(),
            startDate: z.string(),
            endDate: z.string(),
        }),
        data: pageviewSchema.merge(z.object({ totalDuration: z.number() })),
    });

export const getEventsEndpoint = (tb: Tinybird) =>
    tb.buildPipe({
        pipe: "get_website_events__v1",
        parameters: z.object({
            websiteId: z.string(),
            startDate: z.string(),
            endDate: z.string(),
        }),
        data: z.any(),
    });
export const getNewVisitorsEndpoint = (tb: Tinybird) =>
    tb.buildPipe({
        pipe: "get_new_visitors__v1",
        parameters: z.object({
            websiteId: z.string(),
            startDate: z.string(),
            endDate: z.string(),
        }),
        data: z.object({
            createdAt: z.string(),
            visitorId: z.string(),
        }),
    });

export const getIsWebsiteActive = (tb: Tinybird) =>
    tb.buildPipe({
        pipe: "get_is_website_active__v1",
        parameters: z.object({
            websiteId: z.string(),
        }),
        data: z.any(),
    });
