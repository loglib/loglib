import { DB } from "@/server/db/types"
import { Adapter, PageView, Session, Visitor } from "@loglib/core"
import { Kysely } from "kysely"

export const kyselyAdapter = (db: Kysely<DB>): Adapter => {
  return {
    async createSession(data) {
      if (!data.websiteId) throw "website Id is required"

      await db
        .insertInto("web_session")
        .values({
          id: data.id,
          created_at: data.createdAt,
          updated_at: data.createdAt,
          referrer: data.referrer,
          query_params: data.queryParams
            ? JSON.stringify(data.queryParams)
            : "",
          duration: data.duration,
          country: data.country,
          city: data.city,
          device: data.device,
          os: data.os,
          browser: data.browser,
          language: data.language,
          user_id: data.visitorId, //this should be renamed to visitorId at some point
          website_id: data.websiteId,
        })
        .execute()
        .catch((e) => console.log(e, "error"))

      return {} as Session
    },
    async createPageView(data) {
      if (!data.websiteId) throw "website Id is required"
      await db
        .insertInto("web_pageview")
        .values({
          query_params: data.queryParams
            ? JSON.stringify(data.queryParams)
            : "",
          user_id: data.visitorId,
          web_session_id: data.sessionId,
          website_id: data.websiteId,
          updated_at: data.updatedAt,
          created_at: data.createdAt,
          id: data.id,
          page: data.page,
          referrer: data.referrer,
          duration: data.duration,
        })
        .execute()
      return {} as PageView
    },

    async createManyEvents(data) {
      await db
        .insertInto("web_event")
        .values(
          data.map((d) => ({
            id: d.id,
            web_session_id: d.sessionId,
            website_id: d.websiteId ?? "",
            updated_at: d.updatedAt,
            created_at: d.createdAt,
            user_id: d.visitorId,
            page_id: d.pageId,
            event_name: d.eventName,
            event_type: d.eventType,
            payload: d.payload ? JSON.stringify(d.payload) : "",
          }))
        )
        .execute()
      return []
    },

    async updatePageView(data) {
      if (!data.id) throw "id should be provided"
      await db
        .updateTable("web_pageview")
        .set({
          duration: data.duration,
          page: data.page,
          referrer: data.referrer,
        })
        .where("id", "=", data.id)
        .execute()
      return {} as PageView
    },

    async updateSession(data, id) {
      await db
        .updateTable("web_session")
        .set({
          duration: data.duration,
          updated_at: data.updatedAt,
        })
        .where("id", "=", id)
        .execute()
      return {} as Session
    },

    async upsertVisitor(data, id) {
      if (!data.websiteId) throw "website id is required"
      await db
        .insertInto("web_user")
        .values({
          id: id,
          data: data.data ? JSON.stringify(data.data) : "",
          created_at: data.createdAt,
          updated_at: data.updatedAt ?? new Date(),
          website_id: data.websiteId,
        })
        .onDuplicateKeyUpdate({
          data: data.data ? JSON.stringify(data.data) : "",
        })
        .execute()
      return {} as Visitor
    },

    async getVisitor(startDate, endDate, websiteId) {
      if (!websiteId) throw "websiteId is required"
      return await db
        .selectFrom("web_user")
        .where("created_at", "<=", startDate)
        .where("created_at", ">=", endDate)
        .where("website_id", "=", websiteId)
        .selectAll()
        .execute()
        .then((res) =>
          res.map((r) => ({
            ...r,
            createdAt: r.created_at,
            updatedAt: r.updated_at,
            data: JSON.parse(r.data),
            websiteId: r.website_id,
          }))
        )
    },

    async getEvents(startDate, endDate, websiteId) {
      if (!websiteId) throw "websiteId is required"
      return await db
        .selectFrom("web_event")
        .where("created_at", "<=", startDate)
        .where("created_at", ">=", endDate)
        .where("website_id", "=", websiteId)
        .selectAll()
        .execute()
        .then((res) =>
          res.map((r) => {
            const payload = r.payload ? JSON.parse(r.payload) : {}
            return {
              ...r,
              createdAt: r.created_at,
              updatedAt: r.updated_at,
              payload,
              websiteId: r.website_id,
              sessionId: r.web_session_id,
              pageId: r.page_id,
              visitorId: r.user_id,
              eventName: r.event_name,
              eventType: r.event_type,
            }
          })
        )
    },
    async getPageViews(startDate, endDate, websiteId) {
      if (!websiteId) throw "websiteId is required"
      return await db
        .selectFrom("web_pageview")
        .where("created_at", "<=", startDate)
        .where("created_at", ">=", endDate)
        .where("website_id", "=", websiteId)
        .selectAll()
        .execute()
        .then((res) =>
          res.map((r) => ({
            ...r,
            createdAt: r.created_at,
            updatedAt: r.updated_at,
            queryParams: JSON.parse(r.query_params),
            websiteId: r.website_id,
            sessionId: r.web_session_id,
            visitorId: r.user_id,
          }))
        )
    },
    async getSession(startDate, endDate, websiteId) {
      if (!websiteId) throw "websiteId is required"
      return await db
        .selectFrom("web_session")
        .where("created_at", "<=", startDate)
        .where("created_at", ">=", endDate)
        .where("website_id", "=", websiteId)
        .selectAll()
        .execute()
        .then((res) =>
          res.map((r) => ({
            ...r,
            createdAt: r.created_at,
            updatedAt: r.updated_at,
            queryParams: JSON.parse(r.query_params),
            websiteId: r.website_id,
            sessionId: r.id,
            visitorId: r.user_id,
          }))
        )
    },
  }
}
