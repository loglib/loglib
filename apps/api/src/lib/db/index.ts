import { CamelCasePlugin, Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { DB } from "./types";

export const getDb = (config: {
    host: string;
    username: string;
    password: string;
}) =>
    new Kysely<DB>({
        dialect: new PlanetScaleDialect({
            ...config,
            fetch: (url: string, init: RequestInit<RequestInitCfProperties>) => {
                delete (init as any)["cache"];
                return fetch(url, init);
            },
        }),
        plugins: [new CamelCasePlugin()],
    });
