import { Kysely } from "kysely";
import { connect } from "@planetscale/database";
import { PlanetScaleDialect } from "kysely-planetscale";
import type { DB } from "./types";
//@ts-ignore
import { DATABASE_PASSWORD, DATABASE_HOST, DATABASE_USERNAME } from "$env/static/private";

const config = {
    host: DATABASE_HOST,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
};

export const connection = connect(config);

export const db = new Kysely<DB>({
    dialect: new PlanetScaleDialect(config),
});
