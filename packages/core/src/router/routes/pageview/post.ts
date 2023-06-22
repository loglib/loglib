import z from "zod";
import { RootApiTrackerSchema } from "../../schema";
import { ApiPostHandler } from "../../type";
import { GenericError } from "../../../error";
import { getIpAddress } from "../session/detect/getIpAddress";
import { isProduction } from "../../../utils/common";
import { PageView } from "../../..";


export const PageViewSchema = RootApiTrackerSchema.merge(z.object({
    data: z.object({
        currentUrl: z.string(),
        currentRef: z.string(),
        duration: z.number(),
        queryParams: z.record(z.any())
    })
}))


export type PageViewPostInput = z.infer<typeof PageViewSchema>
export const pageViewPost: ApiPostHandler<PageViewPostInput, PageView | null> = async (req, options) => {
    if (!req.body.visitorId) {
        req.body.visitorId = getIpAddress(req) as string
    }
    const body = PageViewSchema.safeParse(req.body)
    const adapter = options.adapter
    if (body.success) {
        const data = body.data
        const { websiteId } = data
        try {
            const res = await adapter.createPageView(
                {
                    id: data.pageId,
                    page: data.data.currentUrl,
                    queryParams: data.data.queryParams,
                    referrer: data.data.currentRef,
                    sessionId: data.sessionId,
                    visitorId: data.visitorId,
                    duration: Math.floor(data.data.duration),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    websiteId
                }
            )
            return {
                message: "success",
                code: 200,
                data: res
            }
        }
        catch (e) {
            if (isProduction(options)) return { message: "error", code: 400 }
            console.error(e, "Error creating pageview")
            throw new GenericError('Error creating pageview', { path: "/pageview" })
        }
    } else {
        if (isProduction(options)) return { message: "error", code: 400 }
        throw new GenericError('Invalid request body', { path: "/pageview" })
    }
}