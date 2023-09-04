import { env } from "../../env";
import { createClient } from "@clickhouse/client";

<<<<<<< HEAD
export const hitsQuery = (startDate: string, endDate: string, websiteId: string) =>
    `select id, sessionId, visitorId, JSONExtract(properties, 'city', 'String') as city, JSONExtract(properties, 'country', 'String') as country,JSONExtract(properties, 'browser', 'String') as browser,JSONExtract(properties, 'language', 'String') as locale,JSONExtract(properties, 'referrerPath', 'String') as referrerPath, JSONExtract(properties, 'currentPath', 'String') as currentPath, JSONExtract(properties, 'referrerDomain', 'String') as referrerDomain, JSONExtract(properties, 'queryParams', 'String') as queryParams, JSONExtract(properties, 'device', 'String') as device, JSONExtract(properties, 'duration', 'Float32') as duration, JSONExtract(properties, 'os', 'String') as os, event, timestamp from loglib.event WHERE ${
        startDate && `timestamp >= '${startDate}' AND`
    } timestamp <= '${endDate}' AND websiteId = '${websiteId}' AND event = 'hits'`;

export const customEventsQuery = (startDate: string, endDate: string, websiteId: string) =>
    `select * from loglib.event WHERE timestamp >= '${startDate}' AND timestamp <= '${endDate}' AND websiteId = '${websiteId}' AND event != 'hits'`;

export const client = createClient({
    host: env.CLICKHOUSE_HOST,
    password: env.CLICKHOUSE_PASSWORD,
});
=======
export const client = env.CLICKHOUSE_HOST ? createClient({
    host: env.CLICKHOUSE_HOST,
    password: env.CLICKHOUSE_PASSWORD,
}) : null
>>>>>>> original/main
