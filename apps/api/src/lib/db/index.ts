import { DB } from "./types";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

export const getDb = (config: {
    host: string;
    username: string;
    password: string;
}) =>
    new Kysely<DB>({
        dialect: new PlanetScaleDialect({
            ...config,
            fetch: (url: string, init: RequestInit<RequestInitCfProperties>) => {
                delete (init as any)["cache"]; // Remove cache header
                return fetch(url, init);
            },
        }),
    });
