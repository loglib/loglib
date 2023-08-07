import isbot from "isbot";
import { RouteType } from "./type";
import { z } from "zod";
import { apiResponse } from "../lib/api-response";
import { browserName, detectOS } from "detect-browser";
import { getDevice } from "../lib/detect/get-device";
import { client } from "../lib/db/clickhouse";
import { getLocation } from "../lib/detect/get-location";
import { getIpAddress } from "../lib/detect/get-ip-address";

const schema = z.object({
    id: z.string(),
    currentPath: z.string(),
    referrerPath: z.string(),
    duration: z.number(),
    referrerDomain: z.string(),
    queryParams: z.record(z.any()),
    language: z.string(),
    screenWidth: z.number(),
    sessionId: z.string(),
    visitorId: z.string(),
    host: z.string(),
    websiteId: z.string(),
    sdkVersion: z.string(),
});

/**
 *
 * this the main hits endpoint for the tracker from version 0.5
 */

export const createHits: RouteType = async ({ req, rawBody }) => {
    if (isbot(req.headers["user-agent"])) {
        return { data: { message: "bot" }, status: 200 };
    }
    const body = schema.safeParse(rawBody);
    if (!body.success) {
        return apiResponse.badRequest;
    }
    const {
        websiteId,
        sessionId,
        visitorId,
        host,
        id,
        screenWidth,
        language,
        referrerDomain,
        referrerPath,
        currentPath,
        queryParams,
        duration,
    } = body.data;
    const ref = !referrerDomain || referrerDomain.includes(host) ? "direct" : referrerDomain;
    const ip = getIpAddress(req);
    const { city, country } = await getLocation(ip, req);
    const userAgent = (req.headers["user-agent"] as string) ?? "unknown";
    const browser = browserName(userAgent) ?? "unknown";
    const os = detectOS(userAgent) ?? "Mac OS";
    const device = os ? getDevice(screenWidth, os) ?? "desktop" : "unknown";
    const res = await client
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
                        referrerDomain: ref,
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
                    sign: 1,
                },
            ],
            format: "JSONEachRow",
        })
        .then((res) => res);
    return {
        status: 200,
        data: res,
    };
};
