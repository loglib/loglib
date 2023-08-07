import { z } from "zod";
import { apiResponse } from "../lib/api-response";
import { RouteType } from "./type";
import { browserName, detectOS } from "detect-browser";
import { client } from "../lib/db/clickhouse";
import { getLocation } from "../lib/detect/get-location";
import { getIpAddress } from "../lib/detect/get-ip-address";
import { setVisitorId } from "../lib/set-visitor-id";

export const pageViewSchema = z.object({
    data: z.object({
        currentUrl: z.string(),
        currentRef: z.string(),
        duration: z.number(),
        queryParams: z.record(z.any()),
        screenWidth: z.string().optional(),
    }),
    pageId: z.string(),
    sessionId: z.string(),
    visitorId: z.string().optional(),
    websiteId: z.string(),
});

export const createPageview: RouteType = async ({ rawBody, req }) => {
    const body = pageViewSchema.safeParse(rawBody);
    if (body.success) {
        const ip = getIpAddress(req);
        const visitorId = setVisitorId(body.data.visitorId, ip);
        const { websiteId, data, pageId, sessionId } = body.data;
        const { currentUrl, currentRef, queryParams, duration } = data;
        const session = await client
            .query({
                query: `select * from loglib.event where sessionId = '${sessionId}' limit 1`,
                format: "JSONEachRow",
            })
            .then(async (res) => await res.json());
        const { city, country } = await getLocation(ip, req);
        const userAgent = (req.headers["user-agent"] as string) ?? "unknown";
        const browser = browserName(userAgent) ?? "unknown";
        const os = detectOS(userAgent) ?? "Mac OS";
        const properties = JSON.parse(session[0].properties);
        const device = properties.device ?? "desktop";
        const language = properties.language ?? "en";
        const referrerDomain = properties.referrerDomain ?? "unknown";
        try {
            await client.insert({
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
                            duration,
                            currentPath: currentUrl,
                            referrerPath: currentRef,
                            referrerDomain,
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
            });
            return {
                data: {
                    message: "successfully created pageview",
                },
                status: 200,
            };
        } catch (e) {
            console.error(e);
            return apiResponse.serverError;
        }
    } else {
        return apiResponse.badRequest;
    }
};

export const updatePageDuration: RouteType = async ({ rawBody }) => {
    const schema = z.object({
        data: z.object({
            duration: z.number(),
            pageDuration: z.number(),
        }),
        pageId: z.string(),
        sessionId: z.string(),
        visitorId: z.string().optional(),
        websiteId: z.string(),
    });
    const body = schema.safeParse(rawBody);
    if (body.success) {
        const { pageId, data } = body.data;
        const query = await client
            .query({
                query: `select * from loglib.event where id = '${pageId}'`,
                format: "JSONEachRow",
            })
            .then(async (res) => await res.json());
        const pageview = query[0];
        if (!pageview)
            return {
                data: { message: "not updated! pageview not recorded yet" },
                status: 200,
            };
        try {
            await client
                .insert({
                    table: "loglib.event",
                    values: [
                        {
                            ...pageview,
                            sign: -1,
                        },
                    ],
                    format: "JSONEachRow",
                })
                .catch((e) => console.log(e));
            await client
                .insert({
                    table: "loglib.event",
                    values: [
                        {
                            ...pageview,
                            properties: JSON.stringify({
                                ...JSON.parse(pageview.properties),
                                duration: data.pageDuration,
                            }),
                            sign: 1,
                        },
                    ],
                    format: "JSONEachRow",
                })
                .catch((e) => console.log(e));
            return {
                data: {
                    message: "successfully updated page duration",
                },
                status: 200,
            };
        } catch {
            return apiResponse.serverError;
        }
    }
    return apiResponse.badRequest;
};
