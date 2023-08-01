import {
  WebEvent,
  WebPageview,
  WebSession,
  WebVisitor,
} from "@/server/db/types"
import { ClickHouseClient } from "@clickhouse/client"
import {
  Adapter,
  Events,
  PageView,
  Session,
  Visitor,
  snakeToCamel,
} from "@loglib/core"

//WIP: Currently only supports reading from clickhouse db
export const clickHouseAdapter = (db: ClickHouseClient): Adapter => {
  return {
    async createSession(data) {
      const d = {
        id: data.id,
        created_at: data.createdAt,
        updated_at: data.createdAt,
        referrer: data.referrer,
        query_params: data.queryParams ? JSON.stringify(data.queryParams) : "",
        duration: data.duration,
        country: data.country,
        city: data.city,
        device: data.device,
        os: data.os,
        browser: data.browser,
        language: data.language,
        user_id: data.visitorId, //this should be renamed to visitorId at some point
        website_id: data.websiteId,
      }
      const result = await db.insert({
        table: "web_session",
        values: [d],
        format: "JSONEachRow",
      })
      console.log(result)
      return {} as Session
    },

    async updateSession(data, id) {
      return {} as Session
    },

    async createPageView(data) {
      const { websiteId, ...rest } = data
      const d = {
        query_params: data.queryParams ? JSON.stringify(data.queryParams) : "",
        user_id: data.visitorId,
        web_session_id: data.sessionId,
        website_id: data.websiteId,
        updated_at: data.updatedAt,
        created_at: data.createdAt,
        id: data.id,
        page: data.page,
        referrer: data.referrer,
        duration: data.duration,
      }
      const result = await db.insert({
        table: "web_pageview",
        values: [d],
        format: "JSONEachRow",
      })
      console.log(result)
      return {} as PageView
    },

    async updatePageView(data) {
      return {} as PageView
    },

    async createManyEvents(data) {
      const result = await db.insert({
        table: "web_event",
        values: data,
        format: "JSONEachRow",
      })
      console.log(result)
      return []
    },

    async upsertVisitor(data, id) {
      try {
        const d = {
          created_at: data.createdAt,
          updated_at: data.updatedAt,
          website_id: data.websiteId,
          data: data.data ? JSON.stringify(data) : "{}",
          id: data.id,
        }
        const res = await db.insert({
          table: "web_user",
          values: [d],
          format: "JSONEachRow",
        })
        console.log(res)
      } catch (e) {
        await db.exec({
          query: `ALTER TABLE web_user UPDATE updated_at = '${
            data.updatedAt
          }', data = '${JSON.stringify(data)}' WHERE id = '${id}';`,
        })
        console.log(e)
      }
      return {} as Visitor
    },

    async getPageViews(startDate, endDate, website_id) {
      const start = startDate
        .toISOString()
        .replace("T", " ")
        .replace(/\..+/, "")
      const end = endDate.toISOString().replace("T", " ").replace(/\..+/, "")
      const q = await db.query({
        query: `SELECT * FROM web_pageview WHERE created_at >= '${start}' AND created_at <= '${end}' AND website_id = '${website_id}'`,
        format: "JSONEachRow",
      })
      const res = (await q.json()) as WebPageview[]
      const data = res.map((pageview) => {
        return {
          ...pageview,
          userId: pageview.user_id,
          websiteId: pageview.website_id,
          createdAt: pageview.created_at,
          updatedAt: pageview.updated_at,
          sessionId: pageview.web_session_id,
          queryParams: pageview.query_params
            ? JSON.parse(pageview.query_params as unknown as string)
            : {},
        }
      })
      return data as unknown as PageView[]
    },

    async getSession(startDate, endDate, websiteId) {
      const start = startDate
        .toISOString()
        .replace("T", " ")
        .replace(/\..+/, "")
      const end = endDate.toISOString().replace("T", " ").replace(/\..+/, "")
      const q = await db.query({
        query: `SELECT * FROM web_session WHERE created_at >= '${start}' AND created_at <= '${end}' AND website_id = '${websiteId}'`,
        format: "JSONEachRow",
      })
      const res = (await q.json()) as WebSession[]
      const data = res.map((session) => {
        return {
          ...session,
          userId: session.user_id,
          websiteId: session.website_id,
          createdAt: session.created_at,
          updatedAt: session.updated_at,
          visitorId: session.user_id,
          queryParams: session.query_params
            ? JSON.parse(session.query_params as unknown as string)
            : {},
        }
      })
      return data as unknown as Session[]
    },

    async getVisitor(startDate, endDate, websiteId) {
      const start = startDate
        .toISOString()
        .replace("T", " ")
        .replace(/\..+/, "")
      const end = endDate.toISOString().replace("T", " ").replace(/\..+/, "")
      const q = await db.query({
        query: `SELECT * FROM web_user WHERE created_at >= '${start}' AND created_at <= '${end}' AND website_id = '${websiteId}'`,
        format: "JSONEachRow",
      })
      const res = (await q.json()) as WebVisitor[]
      const data = res.map((visitor) => {
        return {
          ...visitor,
          userId: visitor.id,
          websiteId: visitor.website_id,
          createdAt: visitor.created_at,
          updatedAt: visitor.updated_at,
          visitorId: visitor.id,
          data: visitor.data
            ? JSON.parse(visitor.data as unknown as string)
            : {},
        }
      })
      return data as unknown as Visitor[]
    },
    async getEvents(startDate, endDate, websiteId) {
      const start = startDate
        .toISOString()
        .replace("T", " ")
        .replace(/\..+/, "")
      const end = endDate.toISOString().replace("T", " ").replace(/\..+/, "")
      const q = await db.query({
        query: `SELECT * FROM web_event WHERE created_at >= '${start}' AND created_at <= '${end}' AND website_id = '${websiteId}'`,
        format: "JSONEachRow",
      })
      const res = (await q.json()) as WebEvent[]
      const data = res.map((event) => {
        return {
          ...event,
          userId: event.user_id,
          websiteId: event.website_id,
          createdAt: event.created_at,
          updatedAt: event.updated_at,
          pageId: event.page_id,
          sessionId: event.web_session_id,
          payload: event.payload
            ? JSON.parse(event.payload as unknown as string)
            : {},
        }
      })
      return data as unknown as Events[]
    },
  }
}
