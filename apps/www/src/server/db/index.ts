import { DB } from "./types";
import { connect } from "@planetscale/database";
import { env } from "env.mjs";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

const config = {
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
};

export const db = new Kysely<DB>({
    dialect: new PlanetScaleDialect(config),
});

export const psDb = connect(config);
