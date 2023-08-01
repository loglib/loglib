import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { DB } from "./types";

export const getDb = (config: {
  host: string;
  username: string;
  password: string;
}) =>
  new Kysely<DB>({
    dialect: new PlanetScaleDialect(config),
  });
