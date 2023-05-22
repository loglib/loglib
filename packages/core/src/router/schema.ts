import z from "zod";

export const RootApiTrackerSchema = z.object({
    pageId: z.string(),
    sessionId: z.string(),
    userId: z.string()
})

export const RootDashboardSchema = z.object({
    path: z.string()
})