import { z } from "zod";
import { EventsWithData } from "./lib/analysis";
import { OperatorType } from "./lib/small-filter";
import { eventSchema, pageviewSchema, sessionSchema, visitorSchema } from "./schema";
export type Path =
    | "/session"
    | "/pageview"
    | "/session/pulse"
    | "/event"
    | "/visitor"
    | "/test"
    | "/insight";

export type Session = z.infer<typeof sessionSchema>;
export type PageView = z.infer<typeof pageviewSchema>;
export type Events = z.infer<typeof eventSchema>;
export type Visitor = z.infer<typeof visitorSchema>;

export type Filter<T> = {
    key: keyof T;
    value: T[keyof T];
    operator: OperatorType<T[keyof T]>;
};

export type GetInsightResponse = {
    insight: {
        uniqueVisitors: {
            total: number;
            change: number;
        };
        pageView: {
            total: number;
            change: number;
        };
        averageTime: {
            total: string;
            change: number;
        };
        bounceRate: {
            total: number;
            change: number;
        };
        newVisitors: {
            total: number;
            change: number;
        };
    };
    data: {
        pages: {
            page: string;
            visits: number;
        }[];
        devices: {
            device: string;
            visits: number;
        }[];
        referrer: {
            referrer: string;
            visits: number;
            referrerDomain: string;
        }[];
        locations: {
            city: {
                location: string;
                visits: number;
                country: string;
            }[];
            country: {
                location: string;
                visits: number;
            }[];
        };
        os: {
            os: string;
            visits: number;
        }[];
        browser: {
            browser: string;
            visits: number;
        }[];
        utmSources: {
            utmSource: string;
            visits: number;
        }[];
        utmCampaigns: {
            utmCampaign: string;
            visits: number;
        }[];
    };
    graph: {
        uniqueVisitorsByDate: {
            date: string;
            visits: number;
        }[];
        uniqueSessionByDate: {
            date: string;
            visits: number;
        }[];
    };
    onlineUsers: number;
    eventsWithData: EventsWithData;
};

export type LoglibEvent = {
    id: string;
    timestamp: string;
    event: "pageview" | "event";
    sessionId: string;
    city: string;
    country: string;
    browser: string;
    language: string;
    currentPath: string;
    referrerPath: string;
    referrerDomain: string;
    queryParams: string;
    device: string;
    duration: number;
    os: string;
    visitorId: string;
};

export type LoglibTrackerEvent = {
    screenWidth: number;
    language: string;
    currentUrl: string;
    referrerUrl: string;
    queryParams: Record<string, string>;
    duration: number;
    host: string;
    sessionId: string;
    visitorId: string;
    sdkVersion: string;
};
