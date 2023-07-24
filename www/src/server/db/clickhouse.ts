import { createClient } from "@clickhouse/client"
import { env } from "env.mjs"

export const client = createClient({
  host: env.CLICKHOUSE_HOST,
  password: env.CLICKHOUSE_PASSWORD,
})
