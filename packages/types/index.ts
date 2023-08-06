import { PageView } from "./models";

export type GetInsightResponse = {
    insight: {
        uniqueVisitors: {
            current: number;
            change: number;
        };
        totalPageViews: {
            current: number;
            change: number;
        };
        averageTime: {
            current: string;
            change: number;
        };
        bounceRate: {
            current: number;
            change: number;
        };
        newVisitors: {
            current: number;
            change: number;
        };
        returningVisitor: {
            current: number;
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
        onlineVisitors: number;
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
};

export type EventsWithData = {
    currentPath: string | undefined;
    id: string;
    timestamp: Date;
    queryParams?: Record<string, any> | null | undefined;
    referrerPath?: string | undefined;
    referrerDomain?: string;
    duration?: number | undefined;
    country?: string | null | undefined;
    city?: string | null | undefined;
    language?: string | null | undefined;
    device?: string | null | undefined;
    os?: string | null | undefined;
    browser?: string | null | undefined;
    visitorId: string;
    websiteId?: string | null | undefined;
    event: string;
    type: string;
    payload: Record<string, string> | null;
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
