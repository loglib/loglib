import { OperatorType } from "./lib/small-filter";
import { eventSchema, pageviewSchema, sessionSchema, visitorSchema } from "./schema";
import { z } from "zod";
export type Path =
    | "/session"
    | "/pageview"
    | "/session/pulse"
    | "/events"
    | "/visitor"
    | "/test"
    | "/insight";

export type Session = z.infer<typeof sessionSchema>;
export type PageView = z.infer<typeof pageviewSchema>;
export type Events = z.infer<typeof eventSchema>;
export type Visitor = z.infer<typeof visitorSchema>;

export type Filter<T, D> = {
    key: keyof T;
    value: T[keyof T];
    operator: OperatorType<T[keyof T]>;
    data: D;
};
