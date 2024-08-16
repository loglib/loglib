import { env } from "../../env";
import { createClient } from "@clickhouse/client";

export const client = env.CLICKHOUSE_HOST
    ? createClient({
          host: env.CLICKHOUSE_HOST,
          password: env.CLICKHOUSE_PASSWORD,
      })
    : null;
