import { Path } from "../type";
import { WebClickHouseClient } from "@clickhouse/client-web/dist/client";

export type RouteType = (data: {
    rawBody: Record<string, string>;
    headers: Headers;
    query: Record<string, string>;
    client: WebClickHouseClient;
}) => Promise<{ data: Record<string, any>; status: number }>;

export type RouterType = (data: {
    rawBody: Record<string, string>;
    headers: Headers;
    client: WebClickHouseClient;
    path: Path;
    query: Record<string, string>;
}) => Promise<{ data: Record<string, string>; status: number }>;
