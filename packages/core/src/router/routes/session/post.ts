import isbot from "isbot";
import z from "zod";
import isLocalhost from "./detect/isLocalHost";
import { getLocation } from "./detect/getLocation";
import { browserName, detectOS } from "detect-browser";
import { getDevice } from "./detect/getDevice";
import { getIpAddress } from "./detect/getIpAddress";
import { ApiPostHandler } from "../../../router/type";
import { GenericError } from "../../../error";
import { RootApiTrackerSchema } from "../../schema";
import { isProduction } from "../../../utils/common";
import { Session } from "../../..";



export const SessionPostSchema = RootApiTrackerSchema.merge(z.object({
    data: z.object({
        pathname: z.string(),
        referrer: z.string(),
        screenWidth: z.number(),
        language: z.string(),
        queryParams: z.object({ utm_source: z.string().optional() }).optional(),
        host: z.string(),
    })
}))
export type SessionPostInput = z.infer<typeof SessionPostSchema>


export const sessionPost: ApiPostHandler<SessionPostInput, Session | null> = async (req, options) => {
    if (isbot(req.headers['user-agent'])) {
        return { message: 'bot', code: 200 }
    }
    //if GDPR compliance is enabled, use ip address as user id
    if (!req.body.visitorId) {
        req.body.visitorId = getIpAddress(req) as string || Math.random().toString(36).substring(7)
    }
    const body = SessionPostSchema.safeParse(req.body)
    if (body.success) {
        const { sessionId, data, visitorId, pageId, websiteId } = body.data
        const { referrer, language, queryParams, screenWidth } = data
        const ipAddress = options.environment === "test" ? "155.252.206.205" : getIpAddress(req) as string
        if (ipAddress && !await isLocalhost(ipAddress)) {
            const location = !options.disableLocation ? options.getLocation ? await options.getLocation(ipAddress) : await getLocation(ipAddress, req).catch(() => null) : { city: null, country: null }
            if (!location && !options.disableLocation) throw new GenericError("LogLib encountered an error while trying to resolve the location of the user. To resolve this issue, you can either set up the MaxMind database by running 'loglib setup:maxmind', or provide a custom implementation. Alternatively, you can disable location resolution by modifying the loglib server configuration.", { path: " / session" })
            const { city, country } = location ? location : { city: null, country: null }
            const adapter = options.adapter
            const userAgent = req.headers['user-agent'] as string
            if (!userAgent) return { message: "Invalid user agent", code: 400 }
            const browser = browserName(userAgent);
            const os = detectOS(userAgent);
            const device = os ? getDevice(screenWidth, os) : null;
            try {
                await adapter.upsertVisitor({
                    id: visitorId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    websiteId
                }, visitorId)

                const session = await adapter.createSession({
                    city, country, visitorId, language, referrer: referrer ? referrer : "direct", id: sessionId,
                    browser,
                    device,
                    os,
                    duration: 0,
                    queryParams: queryParams || null,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    websiteId
                })
                await adapter.createPageView({
                    sessionId: sessionId,
                    visitorId: visitorId,
                    id: pageId,
                    page: data.pathname,
                    referrer: data.referrer,
                    duration: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    queryParams: data.queryParams || null,
                    websiteId
                })
                return {
                    message: "success",
                    code: 200,
                    data: session
                }
            } catch (e) {

                return {
                    message: "error",
                    code: 400,
                }
            }
        } else {
            return {
                message: "localhost",
                code: 200
            }
        }
    } else {
        if (isProduction(options)) {
            return {
                message: 'Invalid request body',
                code: 400,
            }
        }
        throw new GenericError('Invalid request body', { path: "/session" })
    }
}
