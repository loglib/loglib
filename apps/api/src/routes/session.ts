import { browserName, detectOS } from "detect-browser";
import isbot from "isbot";
import { z } from "zod";
import { apiResponse } from "../lib/api-response";
import { getDevice } from "../lib/detect/get-device";
import { setVisitorId } from "../lib/set-visitor-id";
import { RouteType } from "./type";
import { getIpAddress } from "../lib/detect/get-ip-address";
import { getLocation } from "../lib/detect/get-location";
import { client } from "../lib/db/clickhouse";

export const sessionSchema = z.object({
    data: z.object({
        referrer: z.string(),
        pathname: z.string(),
        screenWidth: z.number(),
        language: z.string(),
        queryParams: z.record(z.string(), z.string()),
        host: z.string(),
    }),
    sessionId: z.string(),
    visitorId: z.string(),
    pageId: z.string(),
    websiteId: z.string(),
});
export type SessionInput = z.infer<typeof sessionSchema>;

export const createSession: RouteType = async ({ req, rawBody }) => {
    if (isbot(req.headers["user-agent"])) {
        return { data: { message: "bot" }, status: 200 };
    }
    //if GDPR compliance is enabled, use ip address as user id
    const body = sessionSchema.safeParse(rawBody);
    if (body.success) {
        const ip = getIpAddress(req);
        body.data.visitorId = setVisitorId(body.data.visitorId, ip);
        const { sessionId, data, visitorId, websiteId, pageId } = body.data;
        const { referrer, language, queryParams, screenWidth, pathname } = data;
        const { city, country } = await getLocation(ip, req);
        const userAgent = req.headers["user-agent"];
        const browser = browserName(userAgent) ?? "unknown";
        const os = detectOS(userAgent) ?? "Mac OS";
        const device = os ? getDevice(screenWidth, os) ?? "desktop" : "unknown";
        try {
            await client
                .insert({
                    table: "loglib.event",
                    values: [
                        {
                            id: pageId,
                            sessionId,
                            visitorId,
                            websiteId,
                            event: "hits",
                            properties: JSON.stringify({
                                queryParams: queryParams ? JSON.stringify(queryParams) : "{}",
                                duration: 0,
                                currentPath: pathname,
                                referrerDomain: referrer.length ? referrer : "direct",
                                country,
                                city,
                                language,
                                device,
                                os,
                                browser,
                            }),
                            sign: 1,
                        },
                    ],
                    format: "JSONEachRow",
                })
                .catch((e) => console.log(e))
                .then((res) => console.log(res, referrer.length ?? "direct", "ref"));
            return {
                data: {
                    message: "Session created",
                    data: {
                        country,
                        city,
                    },
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
