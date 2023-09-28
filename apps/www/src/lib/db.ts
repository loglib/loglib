import { createClient } from "@libsql/client";
import { schema } from "@loglib/db";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "env.mjs";

export const getDbUrl = () => {
    if (process.env.NODE_ENV === "production" || env.DATABASE_AUTH_TOKEN) {
        if (!env.DATABASE_URL) {
            throw Error("❌ DATABASE URL MISSING");
        }
        return env.DATABASE_URL;
    }
    const workDir = process.cwd();
    const dir = workDir.split("/");
    const dbPath = `file:${dir.slice(0, dir.length - 2).join("/")}/packages/db/db.sqlite`;
    console.log("⌗ [Database]:", dbPath);
    return dbPath;
};

const client = createClient({
    url: getDbUrl(),
    authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, {
    schema,
});
