import { Tinybird } from "@chronark/zod-bird";
import { z } from "zod";
import { db } from "./db";
import fs from "fs";

const tb = new Tinybird({
  token:
    "p.eyJ1IjogIjA1M2E2NjRiLTg2NGUtNGU0MC04YzM1LTA5Y2MyMGUzZTcyOCIsICJpZCI6ICI1ZWE0NWFiOC05YTZmLTQ5M2ItYTVlYS00ZTdhOTJlMWNiMTMiLCAiaG9zdCI6ICJldV9zaGFyZWQifQ.RNRhYcaM7czeCcHD4KqOfzb8sZ2sb9OTF1A9cxSdf2M",
});

const visitorSchema = z.object({
  id: z.string(),
  websiteId: z.string(),
  createdAt: z.string(),
  data: z.string(),
});

const sessionSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  queryParams: z.string(),
  referrer: z.string(),
  duration: z.number(),
  country: z.string(),
  city: z.string(),
  language: z.string(),
  device: z.string(),
  os: z.string(),
  browser: z.string(),
  visitorId: z.string(),
  websiteId: z.string(),
});

export const pageviewSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  page: z.string(),
  referrer: z.string(),
  queryParams: z.string(),
  duration: z.number(),
  sessionId: z.string(),
  visitorId: z.string(),
  websiteId: z.string(),
});

const eventSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  eventName: z.string(),
  eventType: z.string(),
  payload: z.string(),
  pageId: z.string(),
  sessionId: z.string(),
  visitorId: z.string(),
  websiteId: z.string(),
});

export const publishVisitor = tb.buildIngestEndpoint({
  datasource: "visitors",
  event: visitorSchema,
});

export const publishSession = tb.buildIngestEndpoint({
  datasource: "sessions",
  event: sessionSchema,
});

export const publishPageView = tb.buildIngestEndpoint({
  datasource: "pageviews",
  event: pageviewSchema,
});

export const publishEvents = tb.buildIngestEndpoint({
  datasource: "events",
  event: eventSchema,
});

export const getVisitors = tb.buildPipe({
  pipe: "get_website_visitors__v1",
  parameters: z.object({
    websiteId: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  }),
  data: z.any(),
});

export const getSessions = tb.buildPipe({
  pipe: "get_website_sessions__v1",
  parameters: z.object({
    websiteId: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  }),
  data: z.any(),
});

export const getPageViews = tb.buildPipe({
  pipe: "get_website_pageviews__v1",
  parameters: z.object({
    websiteId: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  }),
  data: z.any(),
});

export const getEvents = tb.buildPipe({
  pipe: "get_website_events__v1",
  parameters: z.object({
    websiteId: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  }),
  data: z.any(),
});

export async function migrateVisitors() {
  const take = 100;
  const skip = 0;
  const visitors = await db.webPageview.findMany().then((res) =>
    res.map((v) => ({
      duration: v.duration,
      pageId: v.id,
      sessionId: v.sessionId,
      timestamp: v.createdAt,
    })),
  );
  console.log(visitors.length);
  fs.writeFileSync("page_durations.json", JSON.stringify(visitors));
  // const failed: z.infer<typeof visitorSchema>[] = [];
  // console.log("begin");
  // console.log(visitors.length);
  // for (let i = 0; i < 100; i++) {
  //   visitors.map(async (v) => {
  //     const data = {
  //       id: v.id,
  //       websiteId: v.websiteId,
  //       timestamp: v.createdAt.getTime().toString(),
  //       data: JSON.stringify(v),
  //     };
  //     try {
  //       const x = await publishVisitor(data);
  //       console.log(x);
  //     } catch (e) {
  //       console.error("failed");
  //       failed.push(data);
  //     }
  //   });
  //   skip += take;
  //   console.log(skip, visitors.length);
  //   if (visitors.length < take) {
  //     break;
  //   }
  // }
  // failed.map(async (v) => {
  //   try {
  //     const x = await publishVisitor(v);
  //     console.log(x);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // });
}
