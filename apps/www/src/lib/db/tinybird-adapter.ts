import { Adapter, PageView, Session, Visitor } from "@loglib/core";
import {
  getEvents,
  getPageViews,
  getSessions,
  getVisitors,
  publishEvents,
  publishPageView,
  publishSession,
  publishVisitor,
} from "../tinybird";

export const tinyBirdAdapter = (): Adapter => {
  return {
    async createPageView(_) {
      return {} as PageView;
    },

    async createSession(_) {
      return {} as Session;
    },

    async updateSession(data, id) {
      await publishSession({
        id: id,
        createdAt: new Date(),
        queryParams: data.queryParams ? JSON.stringify(data.queryParams) : "{}",
        referrer: data.referrer ?? "",
        duration: data.duration ?? 0,
        country: data.country ?? "",
        city: data.city ?? "",
        language: data.language ?? "",
        device: data.device ?? "",
        os: data.os ?? "",
        browser: data.browser ?? "",
        visitorId: data.visitorId ?? "",
        websiteId: data.websiteId ?? "",
      });
      return {} as Session;
    },

    async createManyEvents(d) {
      d.map(async (data) => {
        await publishEvents({
          id: data.id,
          createdAt: new Date(),
          eventName: data.eventName,
          eventType: data.eventType,
          payload: data.payload ? JSON.stringify(data.payload) : "{}",
          pageId: data.pageId,
          sessionId: data.sessionId,
          visitorId: data.visitorId,
          websiteId: data.websiteId ?? "",
        });
      });
      return [];
    },

    async upsertVisitor(data, id) {
      await publishVisitor({
        id: id,
        createdAt: new Date(),
        data: data.data ? JSON.stringify(data.data) : "{}",
        websiteId: data.websiteId ?? "",
      });
      return {} as Visitor;
    },
    async updatePageView(data) {
      await publishPageView({
        id: data.id as string,
        createdAt: new Date(),
        page: data.page ?? "",
        referrer: data.referrer ?? "",
        queryParams: data.queryParams ? JSON.stringify(data.queryParams) : "{}",
        duration: data.duration ?? 0,
        sessionId: data.sessionId ?? "",
        visitorId: data.visitorId ?? "",
        websiteId: data.websiteId ?? "",
      });
      return {} as PageView;
    },

    async getSession(startDate, endDate, websiteId: string) {
      return await getSessions({
        websiteId,
        startDate: startDate.toISOString().slice(0, 19).replace("T", " "),
        endDate: endDate.toISOString().slice(0, 19).replace("T", " "),
      }).then((res) =>
        res.data.map((s) => ({
          ...s,
          updatedAt: s.createdAt,
          queryParams: JSON.parse(s.queryParams),
        })),
      );
    },

    async getPageViews(startDate, endDate, websiteId: string) {
      return await getPageViews({
        websiteId,
        startDate: startDate.toISOString().slice(0, 19).replace("T", " "),
        endDate: endDate.toISOString().slice(0, 19).replace("T", " "),
      }).then((res) =>
        res.data.map((p) => ({
          ...p,
          updatedAt: p.createdAt,
          queryParams: JSON.parse(p.queryParams),
        })),
      );
    },

    async getEvents(startDate, endDate, websiteId: string) {
      return await getEvents({
        websiteId,
        startDate: startDate.toISOString().slice(0, 19).replace("T", " "),
        endDate: endDate.toISOString().slice(0, 19).replace("T", " "),
      }).then((res) =>
        res.data.map((p) => ({
          ...p,
          updatedAt: p.createdAt,
          payload: JSON.parse(p.payload),
        })),
      );
    },

    async getVisitor(startDate, endDate, websiteId: string) {
      return await getVisitors({
        websiteId,
        startDate: startDate.toISOString().slice(0, 19).replace("T", " "),
        endDate: endDate.toISOString().slice(0, 19).replace("T", " "),
      }).then((res) =>
        res.data.map((p) => ({
          ...p,
          updatedAt: p.createdAt,
          data: JSON.parse(p.data),
        })),
      );
    },
  };
};
