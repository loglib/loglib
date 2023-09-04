import { createId } from "@paralleldrive/cuid2";
import { integer, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export function boolean(name: string) {
    return integer(name, {
        mode: "boolean",
    });
}

export function date(name: string) {
    return integer(name, {
<<<<<<< HEAD
        mode: "timestamp",
    })
        .$defaultFn(() => new Date())
        .notNull();
=======
        mode: "timestamp"
    }).$defaultFn(() => new Date())
>>>>>>> original/main
}

export function id(name?: string) {
    return text(name ?? "id")
        .primaryKey()
        .$defaultFn(createId);
}

export function userId() {
    return text("userId")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull();
}
