<<<<<<< HEAD
import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { boolean, date, id, userId } from "./utils";
import { relations } from "drizzle-orm";
import { teamMember } from ".";
=======
import { index, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { boolean, date, id, userId } from './utils';
import { relations } from 'drizzle-orm';
import { teamMember, users } from '.';
>>>>>>> original/main

export const website = sqliteTable(
    "website",
    {
        id: id(),
        createdAt: date("createdAt"),
        url: text("url").notNull(),
        title: text("title"),
        userId: userId(),
        active: boolean("active").default(false).notNull(),
        public: boolean("public").default(false).notNull(),
    },
    (table) => ({
        websiteUserIdx: index("website_userIdx").on(table.userId),
    }),
);

export const websiteRelations = relations(website, ({ many, one }) => {
    return {
        teamWebsites: many(teamMember),
<<<<<<< HEAD
    };
});
=======
        user: one(users, {
            fields: [website.userId],
            references: [users.id]
        })
    }
})
>>>>>>> original/main
