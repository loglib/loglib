import { Path } from "../type";

export type ApiRequest = {
    headers: Record<string, string>;
    query: Record<string, string>;
};

export type RouteType = (data: {
    rawBody: Record<string, string>;
    req: ApiRequest;
}) => Promise<{ data: Record<string, any>; status: number }>;

export type RouterType = (data: {
    rawBody: Record<string, string>;
    req: ApiRequest;
    path: Path;
}) => Promise<{ data: Record<string, string>; status: number }>;
