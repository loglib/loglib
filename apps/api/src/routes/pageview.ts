import { z } from "zod";
import { apiResponse } from "../lib/api-response";
import { publishPageDuration, publishPageView } from "../lib/tinybird";
import { RouteType } from "./type";

export const pageViewSchema = z.object({
  data: z.object({
    currentUrl: z.string(),
    currentRef: z.string(),
    duration: z.number(),
    queryParams: z.record(z.any()),
  }),
  pageId: z.string(),
  sessionId: z.string(),
  visitorId: z.string().optional(),
  websiteId: z.string(),
});

export const createPageview: RouteType = async ({ rawBody, headers, tb }) => {
  const body = pageViewSchema.safeParse(rawBody);
  if (body.success) {
    if (!body.data.visitorId) {
      body.data.visitorId = headers.get("cf-connecting-ip") as string;
    }
    const { websiteId, data, pageId, sessionId } = body.data;
    const { currentUrl, currentRef, queryParams } = data;
    try {
      await publishPageView(tb)({
        id: pageId,
        page: currentUrl,
        queryParams: JSON.stringify(queryParams),
        referrer: currentRef,
        sessionId: sessionId,
        visitorId: body.data.visitorId,
        createdAt: new Date().toISOString(),
        websiteId,
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

/**
 * this is for older tracker sdk where it sends page duration in different payload
 */
export const createPageDuration: RouteType = async ({ rawBody, tb }) => {
  const schema = z.object({
    data: z.object({
      duration: z.number(),
      pageDuration: z.number(),
    }),
    pageId: z.string(),
    sessionId: z.string(),
    visitorId: z.string().optional(),
  });
  const body = schema.safeParse(rawBody);
  if (body.success) {
    const { pageId, data, sessionId } = body.data;
    try {
      await publishPageDuration(tb)({
        duration: data.pageDuration,
        pageId,
        sessionId,
        timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
      });
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
