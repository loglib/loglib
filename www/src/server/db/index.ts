import { Kysely } from "kysely"
import { PlanetScaleDialect } from "kysely-planetscale"
import { DB } from "./types"
import { env } from "env.mjs"

const config = {
  host: env.DATABASE_HOST,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
}

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect(config),
})
