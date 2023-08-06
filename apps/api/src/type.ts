import { OperatorType } from "./lib/small-filter";
export type Path =
    | "/session"
    | "/pageview"
    | "/session/pulse"
    | "/event"
    | "/visitor"
    | "/test"
    | "/insight";

export type Filter<T> = {
    key: keyof T;
    value: T[keyof T];
    operator: OperatorType<T[keyof T]>;
};

export type LoglibEvent = {
    id: string;
    timestamp: string;
    event: "hits" | string;
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
