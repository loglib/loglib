import { EventRes } from "../type";
import { client } from "./clickhouse";
import { db } from "./drizzle";
import { schema } from "@loglib/db";
import { convertToUTC } from "../lib/utils";
import { sql } from "drizzle-orm";
import { LoglibEvent } from '../type';
import { kafka } from "@loglib/clickhouse";


export const hitsQuery = (startDate: string, endDate: string, websiteId: string) =>
    `select id, sessionId, visitorId, JSONExtract(properties, 'city', 'String') as city, JSONExtract(properties, 'country', 'String') as country,JSONExtract(properties, 'browser', 'String') as browser,JSONExtract(properties, 'language', 'String') as locale,JSONExtract(properties, 'referrerPath', 'String') as referrerPath, JSONExtract(properties, 'currentPath', 'String') as currentPath, JSONExtract(properties, 'referrerDomain', 'String') as referrerDomain, JSONExtract(properties, 'queryParams', 'String') as queryParams, JSONExtract(properties, 'device', 'String') as device, JSONExtract(properties, 'duration', 'Float32') as duration, JSONExtract(properties, 'os', 'String') as os, event, timestamp from loglib.event WHERE ${startDate && `timestamp >= '${startDate}' AND`} timestamp <= '${endDate}' AND websiteId = '${websiteId}' AND event = 'hits'`;

export const customEventsQuery = (startDate: string, endDate: string, websiteId: string) =>
    `select * from loglib.event WHERE timestamp >= '${startDate}' AND timestamp <= '${endDate}' AND websiteId = '${websiteId}' AND event != 'hits'`;

const createEvent = () => {
    return async (
        {
            id,
            sessionId,
            visitorId,
            websiteId,
            queryParams,
            referrerDomain,
            country,
            city,
            language,
            device,
            os,
            browser,
            duration,
            currentPath,
            referrerPath,
            event,
            payload,
            type,
            pageId
        }: LoglibEvent & {
            payload?: string;
            pageId?: string;
            type?: string;
        },
    ) => {
        return {
            clickhouse: async () => {
                const { enabled, sendMessages, connect } = kafka
                const value = {
                    id,
                    sessionId,
                    visitorId,
                    websiteId,
                    event,
                    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
                    properties: JSON.stringify({
                        queryParams: queryParams ? JSON.stringify(queryParams) : "{}",
                        referrerDomain,
                        country,
                        city,
                        language,
                        device,
                        os,
                        browser,
                        duration,
                        currentPath,
                        referrerPath,
                        payload,
                        type,
                        pageId
                    }),
                    sign: 1,
                }
                if (enabled) {
                    await connect()
                    await sendMessages([value], "events")
                } else {
                    await client
                        .insert({
                            table: "loglib.event",
                            values: [
                                value
                            ],
                            format: "JSONEachRow",
                        })
                        .then((res) => res)
                }
            },
            sqlite: async () => db.insert(schema.events).values({
                id,
                sessionId,
                visitorId,
                websiteId,
                event,
                timestamp: new Date(),
                properites: {
                    queryParams,
                    referrerDomain,
                    country,
                    city,
                    language,
                    device,
                    os,
                    browser,
                    duration,
                    currentPath,
                    referrerPath,
                }
            })
        }
    }
}

async function getHitsData(
    startDateObj: Date,
    endDateObj: Date,
    websiteId: string,
) {
    return {
        sqlite: async () => {
            const event = schema.events
            return await db.select().from(event).where(sql`${event.websiteId} = ${websiteId} and event = 'hits' and ${event.timestamp} >= ${new Date(startDateObj.getTime())} and ${event.timestamp} <= ${new Date(endDateObj).getTime()}`).then(res => res.map(event => {
                const { properites, timestamp, ...rest } = event
                return {
                    ...rest,
                    ...properites,
                    timestamp: timestamp.toISOString().slice(0, 19).replace("T", " ")
                }
            }))
        },
        clickhouse: async () => {
            return await client
                .query({
                    query: hitsQuery(convertToUTC(startDateObj), convertToUTC(endDateObj), websiteId),
                    format: "JSONEachRow",
                })
                .then(async (res) => (await res.json()) as LoglibEvent[])
        }
    }
}

async function getCustomEventData(
    startDateObj: Date,
    endDateObj: Date,
    websiteId: string,
) {
    return {
        sqlite: async () => {
            const event = schema.events
            return await db.select().from(event).where(sql`${event.websiteId} = ${websiteId} and event != 'hits' and ${event.timestamp} >= ${new Date(startDateObj.getTime())} and ${event.timestamp} <= ${new Date(endDateObj).getTime()}`).then(res => res.map(event => {
                const { properites, timestamp, ...rest } = event
                return {
                    ...rest,
                    ...properites,
                    timestamp: timestamp.toISOString().slice(0, 19).replace("T", " ")
                }
            }))
        },
        clickhouse: async () => {
            return await client
                .query({
                    query: customEventsQuery(convertToUTC(startDateObj), convertToUTC(endDateObj), websiteId),
                    format: "JSONEachRow",
                })
                .then(async (res) => (await res.json()) as EventRes[]).then(res => res.map(s => {
                    const properties = JSON.parse(s.properties);
                    return {
                        ...properties,
                        id: s.id,
                        event: s.event,
                        sessionId: s.sessionId,
                        websiteId: s.websiteId,
                        visitorId: s.visitorId,
                        timestamp: s.timestamp,
                        duration: properties.duration ?? 0,
                    };
                }))
        }
    }
}

export function loglibDb(db: "sqlite" | "clickhouse") {
    return {
        async insertEvent(data: LoglibEvent & {
            payload?: string;
            pageId?: string;
            type?: string;
        }) {
            const hits = createEvent()
            const insert = await hits(data)
            return await insert[db]()
        },
        async getHits(startDateObj: Date, endDateObj: Date, pastEndDateObj: Date, websiteId: string) {
            console.log("db client")
            console.log(db)
            const query1 = await getHitsData(startDateObj, endDateObj, websiteId)
            const query2 = await getHitsData(endDateObj, pastEndDateObj, websiteId)
            return await Promise.all([query1[db](), query2[db]()])
        },
        async getCustomEvents(startDateObj: Date, endDateObj: Date, websiteId: string) {
            const query = await getCustomEventData(startDateObj, endDateObj, websiteId)
            return await query[db]()
        }
    }
}