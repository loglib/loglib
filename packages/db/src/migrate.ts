import { migrate } from "drizzle-orm/libsql/migrator";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

async function main() {
    const arg1 = process.argv[2] ?? "file:./db.sqlite";
    const arg2 = process.argv[3];
    console.log("⌗ Starting Migration", "[Database]:", arg1, "[Auth Token]:", arg2);
    const client = createClient({
        url: arg1,
        authToken: arg2,
    });
    const db = drizzle(client);
    await migrate(db, {
        migrationsFolder: "./migrations",
    });
}

main()
    .then(() => {
        console.log("✅: [Migration Complete]");
    })
    .catch((e) => {
        console.log(e, "❗️:[Migration Failed]");
    });
