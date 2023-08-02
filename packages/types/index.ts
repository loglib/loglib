import { PageView } from "./models";

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

export type EventsWithData = {
    page: PageView | undefined;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    queryParams?: Record<string, any> | null | undefined;
    referrer?: string | undefined;
    duration?: number | undefined;
    country?: string | null | undefined;
    city?: string | null | undefined;
    language?: string | null | undefined;
    device?: string | null | undefined;
    os?: string | null | undefined;
    browser?: string | null | undefined;
    visitorId: string;
    websiteId?: string | null | undefined;
    eventName: string;
    eventType: string;
    payload: Record<string, any> | null;
    pageId: string;
    sessionId: string;
}[];

type StringOperator = "is" | "isNot" | "contains" | "notContains";
type NumberOperator = "lte" | "gte" | "lt" | "gt" | "is" | "isNot";
type DateOperator = "lte" | "gte" | "lt" | "gt" | "is" | "isNot";
type ArrayOperator = "contains" | "notContains";

export type OperatorType<T> = T extends string
    ? StringOperator
    : T extends number
    ? NumberOperator
    : T extends Date
    ? DateOperator
    : T extends Array<any>
    ? ArrayOperator
    : never;
