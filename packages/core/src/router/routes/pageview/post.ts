import z from "zod";
import { RootApiTrackerSchema } from "../../schema";
import { ApiPostHandler } from "../../type";
import { GenericError } from "../../../error";
import { getIpAddress } from "../session/detect/getIpAddress";


export const PageViewSchema = RootApiTrackerSchema.merge(z.object({
    data: z.object({
        currentUrl: z.string(),
        currentRef: z.string(),
        duration: z.number(),
        queryParams: z.record(z.any())
    })
}))


export type PageViewPostInput = z.infer<typeof PageViewSchema>
export const pageViewPost: ApiPostHandler<PageViewPostInput> = async (req, options) => {
    if (!req.body.userId) {
        req.body.userId = getIpAddress(req) as string
    }
    const body = PageViewSchema.safeParse(req.body)
    const adapter = options.adapter
    if (body.success) {
        const data = body.data
        try {
            const res = await adapter.upsertPageView(
                {
                    id: data.pageId,
                    page: data.data.currentUrl,
                    queryParams: data.data.queryParams,
                    referrer: data.data.currentRef,
                    sessionId: data.sessionId,
                    userId: data.userId,
                    duration: Math.floor(data.data.duration),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            )
            return {
                message: "success",
                code: 200,
                data: res
            }
        }
        catch (e) {
            console.error(e, "Error creating pageview")
            throw new GenericError('Error creating pageview', { path: "/pageview" })
        }
    } else {
        throw new GenericError('Invalid request body', { path: "/pageview" })
    }
}