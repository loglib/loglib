import { ClickHouseClient } from "@clickhouse/client"
import { Adapter, PageView, Session, Visitor } from "@loglib/core"

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
      //   const result = await db.exec({
      //     query: `ALTER TABLE web_session UPDATE ${Object.keys(data)
      //       .map((key) => `${key} = '${data[key]}'`) // Enclose values in quotes
      //       .join(",")} WHERE id = '${id}'`, // Enclose ID in quotes
      //   })
      //   console.log(result)
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
      //   const result = await db.exec({
      //     query: `UPDATE web_pageview SET ${Object.keys(data)
      //       .map((key) => `${key} = ${data[key]}`)
      //       .join(",")} WHERE id = ${data.id}`,
      //   })
      //   console.log(result)
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

    async getVisitor(startDate, endDate, websiteId) {
      const result = await db.query({
        query: `SELECT * FROM web_visitor WHERE websiteId = ${websiteId} AND createdAt BETWEEN ${startDate} AND ${endDate}`,
      })
      console.log(await result.json())
      return {} as Visitor
    },
  }
}
