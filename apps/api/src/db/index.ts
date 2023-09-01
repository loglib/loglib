import { loglibDb } from "./queries";

const type = process.env.CLICKHOUSE_HOST ? "clickhouse" : "sqlite";
console.log("⌗ [Event Database]:", type);
export const eventDB = loglibDb(type);
