import { Adapter, Events, PageView, Session, User, snakeToCamel, camelToSnake } from "@loglib/core";

import { SupabaseClient } from "@supabase/supabase-js";

const supabaseAdapter = (db: SupabaseClient): Adapter => {
    return {
        async createSession(data) {
            const response = await db.from("web_session").insert(camelToSnake(data)).select("*").single().throwOnError()
            const resData = { ...response.data, query_params: JSON.parse(response.data?.query_params as string) }
            return snakeToCamel(resData) as unknown as Session;
        },
        async updateSession(data, id) {
            const response = await db.from("web_session").update(camelToSnake({ ...data, })).match({ id }).select("*").single()
            const resData = { ...response.data, query_params: JSON.parse(response.data?.query_params as string) }
            return snakeToCamel(resData) as unknown as Session;
        },
        async createPageView(data) {
            const response = await db.from("web_pageview").insert(camelToSnake(data)).select("*").single().throwOnError()
            const resData = { ...response.data, query_params: JSON.parse(response.data?.query_params as string) }
            return snakeToCamel(resData) as unknown as PageView;
        },
        async createManyEvents(data) {
            const promises = data.map(async (event) => {
                const response = await db.from("web_event").upsert(camelToSnake(event)).select("*").single().throwOnError()
                return response.data as unknown as Events;
            });
            return Promise.all(promises).catch((error) => {
                console.log(error)
                throw error;
            });
        },
        async updatePageView(data) {
            const response = await db.from("web_pageview").update(camelToSnake(data)).eq("id", data.id).select("*").single().throwOnError()
            const resData = { ...response.data, query_params: JSON.parse(response.data?.query_params as string) }
            return snakeToCamel(resData) as unknown as PageView;
        },
        async upsertUser(data) {
            const response = await db.from("web_user").upsert(camelToSnake(data)).select("*").single().throwOnError()
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const resData = { ...response.data, data: JSON.parse(response.data?.data) }
            return snakeToCamel(resData) as unknown as User
        },
        async getUser(startDate, endDate) {
            const res = (await db.from("web_user").select("*").gte("created_at", startDate.toUTCString()).lte("created_at", endDate.toUTCString()).select("*")).data as unknown as User[]
            return snakeToCamel(res)
        },
        async getEvents(startDate, endDate) {
            const res = await db.from("web_event").select("*").gte("created_at", startDate.toUTCString()).lte("created_at", endDate.toUTCString()).select("*").throwOnError()
            if (res.data === null || res.data.length === 0) return []
            res.data = res.data.map((event) => {
                event.payload = JSON.parse(event.payload as string)
                return event
            })
            return snakeToCamel(res.data as object) as unknown as Events[]
        },
        async getPageViews(startDate, endDate) {
            const res = await db.from("web_pageview").select("*").gte("created_at", startDate.toUTCString()).lte("created_at", endDate.toUTCString())
            return snakeToCamel(res.data as object) as unknown as PageView[]
        },
        async getSession(startDate, endDate) {
            const res = (await db.from("web_session").select("*").gte("created_at", startDate.toUTCString()).lte("created_at", endDate.toUTCString()).select("*"))
            return snakeToCamel(res.data as unknown as Session[])
        },
    }
}
export { supabaseAdapter }