import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { DB } from "./types";

export const db = new Kysely<DB>({
    dialect: new PlanetScaleDialect({
        host: process.env.DATABASE_HOST,
        password: process.env.DATABASE_PASSWORD,
        username: process.env.DATABASE_USERNAME,
    }),
});
