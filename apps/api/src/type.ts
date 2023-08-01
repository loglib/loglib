import { z } from "zod";
import { eventSchema, pageviewSchema, sessionSchema, visitorSchema } from "./schema";

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
