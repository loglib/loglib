import isbot from "isbot";
import { RouteType } from "./type";
import { z } from "zod";
import { apiResponse } from "../lib/api-response";
import { browserName, detectOS } from "detect-browser";
import { getDevice } from "../lib/detect/get-device";

const schema = z.object({
    id: z.string(),
    screenWidth: z.number(),
    language: z.string(),
    currentPath: z.string(),
    referrerPath: z.string(),
    referrerDomain: z.string(), //session
    queryParams: z.string(),
    duration: z.number(),
    host: z.string(),
    sessionId: z.string(),
    sdkVersion: z.string(),
    visitorId: z.string(),
    websiteId: z.string(),
});

/**
 * on progress: a new tracker sdk should use this endpoint in default. We should avoid fetching data and updates as much as possible but we'll keep the support for the old sdk for sometime.
 */

export const createEvent: RouteType = async ({ headers, rawBody, client }) => {
    if (isbot(headers.get("user-agent"))) {
        return { data: { message: "bot" }, status: 200 };
    }
    const body = schema.safeParse(rawBody);
    if (!body.success) {
        return apiResponse.badRequest;
    }
    const {
        id,
        visitorId,
        sessionId,
        screenWidth,
        language,
        referrerDomain,
        referrerPath,
        currentPath,
        queryParams,
        duration,
        websiteId,
    } = body.data;
    const city = (headers.get("cf-ipcity") as string) ?? "unknown";
    const country = (headers.get("cf-ipcountry") as string) ?? "unknown";
    const userAgent = (headers.get("user-agent") as string) ?? "unknown";
    const browser = browserName(userAgent) ?? "unknown";
    const os = detectOS(userAgent) ?? "Mac OS";
    const device = os ? getDevice(screenWidth, os) ?? "desktop" : "unknown";
    await client
        .insert({
            table: "loglib.event",
            values: [
                {
                    id,
                    sessionId,
                    visitorId,
                    websiteId,
                    event: "hits",
                    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
                    properties: JSON.stringify({
                        queryParams: queryParams ? JSON.stringify(queryParams) : "{}",
                        referrerDomain,
                        country,
                        city,
                        language,
                        device,
                        os,
                        browser,
                        duration,
                        currentPath,
                        referrerPath,
                    }),
                },
            ],
            format: "JSONEachRow",
        })
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
};
