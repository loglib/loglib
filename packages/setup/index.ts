import { ClickHouseClient } from "@clickhouse/client";

export const setupClickhouseDb = async (client: ClickHouseClient) => {
	await client.exec({
		query: "CREATE DATABASE loglib",
	});
	await client.exec({
		query: `CREATE TABLE loglib.event (
            id String,
            event String,
            sessionId String,
            visitorId String,
            properties String DEFAULT '{}',
            timestamp DateTime DEFAULT now(),
            websiteId String,
            sign Int8
        ) ENGINE = CollapsingMergeTree(sign)
        ORDER BY (id)`,
	});
};
