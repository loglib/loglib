import { Tinybird } from "@chronark/zod-bird";
import { Path } from "../type";

export type RouteType = (data: {
  rawBody: Record<string, string>;
  headers: Headers;
  query: Record<string, string>;
  tb: Tinybird;
}) => Promise<{ data: Record<string, any>; status: number }>;

export type RouterType = (data: {
  rawBody: Record<string, string>;
  headers: Headers;
  tb: Tinybird;
  path: Path;
  query: Record<string, string>;
}) => Promise<{ data: Record<string, string>; status: number }>;
