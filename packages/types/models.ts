export type Visitor = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    data: Record<string, any>;
    websiteId?: string | null;
};

export type Session = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    queryParams: Record<string, any> | null;
    referrer: string;
    duration: number;
    country: string | null;
    city: string | null;
    language: string | null;
    device: string | null;
    os: string | null;
    browser: string | null;
    visitorId: string;
    websiteId?: string | null;
};

export type PageView = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    page: string;
    referrer: string;
    queryParams: Record<string, string> | null;
    duration: number;
    sessionId: string;
    visitorId: string;
    websiteId?: string | null;
};

export type Events = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    eventName: string;
    eventType: string;
    payload: Record<string, any> | null;
    pageId: string;
    sessionId: string;
    visitorId: string;
    websiteId?: string | null;
};

export type Website = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string | null;
    url: string;
    visitorId: string;
};
