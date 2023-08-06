import { HonoRequest } from "hono";
import { Path } from "../type";

export type RouteType = (data: {
    rawBody: Record<string, string>;
    req: HonoRequest;
    query: Record<string, string>;
}) => Promise<{ data: Record<string, any>; status: number }>;

export type RouterType = (data: {
    rawBody: Record<string, string>;
    req: HonoRequest;
    path: Path;
    query: Record<string, string>;
}) => Promise<{ data: Record<string, string>; status: number }>;
