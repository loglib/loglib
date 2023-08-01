import { z } from "zod";
import isbot from "isbot";
import { apiResponse } from "../lib/api-response";
import { browserName, detectOS } from "detect-browser";
import { getDevice } from "../lib/detect/get-device";
import { publishSession } from "../lib/tinybird";
import { setVisitorId } from "../lib/set-visitor-id";
import { RouteType } from "./type";

export const sessionSchema = z.object({
    data: z.object({
        referrer: z.string(),
        screenWidth: z.number(),
        language: z.string(),
        queryParams: z.record(z.string(), z.string()),
        host: z.string(),
    }),
    sessionId: z.string(),
    visitorId: z.string(),
    websiteId: z.string(),
});
export type SessionInput = z.infer<typeof sessionSchema>;

export const createSession: RouteType = async ({ headers, rawBody, tb }) => {
    if (isbot(headers.get("user-agent"))) {
        return { data: { message: "bot" }, status: 200 };
    }
    //if GDPR compliance is enabled, use ip address as user id
    const body = sessionSchema.safeParse(rawBody);

    if (body.success) {
        body.data.visitorId = setVisitorId(
            body.data.visitorId,
            headers.get("cf-connecting-ip") as string,
        );
        const { sessionId, data, visitorId, websiteId } = body.data;
        const { referrer, language, queryParams, screenWidth } = data;
        const city = (headers.get("cf-ipcity") as string) ?? "unknown";
        const country = (headers.get("cf-ipcountry") as string) ?? "unknown";
        const userAgent = (headers.get("user-agent") as string) ?? "unknown";
        const browser = browserName(userAgent) ?? "unknown";
        const os = detectOS(userAgent) ?? "Mac OS";
        const device = os ? getDevice(screenWidth, os) ?? "desktop" : "unknown";
        try {
            console.log({
                id: sessionId,
                createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
                queryParams: queryParams ? JSON.stringify(queryParams) : "{}",
                referrer: referrer ?? "direct",
                country,
                city,
                language,
                device,
                os,
                browser,
                visitorId,
                websiteId,
            });
            await publishSession(tb)({
                id: sessionId,
                createdAt: new Date().toISOString(),
                queryParams: queryParams ? JSON.stringify(queryParams) : "{}",
                referrer,
                country,
                city,
                language,
                device,
                os,
                browser,
                visitorId,
                websiteId,
            });
            return {
                data: {
                    message: "Session updated",
                },
                status: 200,
            };
        } catch (e) {
            console.log(e, "error");
            return apiResponse.serverError;
        }
    } else {
        return apiResponse.badRequest;
    }
};
