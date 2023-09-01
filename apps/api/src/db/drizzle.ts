import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { schema } from "@loglib/db";

export const getDbUrl = () => {
    if (process.env.NODE_ENV === "production" || process.env.DATABASE_AUTH_TOKEN)
        return process.env.DATABASE_URL;
    const workDir = process.cwd();
    const dir = workDir.split("/");
    const dbPath = `file:${dir.slice(0, dir.length - 2).join("/")}/packages/db/db.sqlite`;
    console.log("⌗ [Database]:", dbPath);
    return dbPath;
};

const client = createClient({
    url: getDbUrl(),
    authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, {
    schema,
});
