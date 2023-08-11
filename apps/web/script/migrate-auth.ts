import { db } from "../src/lib/services/db";

const migrateNextAuthToLucia = async () => {
    const users = await db
        .selectFrom("users")
        .innerJoin("accounts", "accounts.userId", "users.id")
        .select(["users.id", "accounts.providerAccountId", "accounts.provider"])
        .execute();
    const dRes = await db
        .selectFrom("auth_key")
        .leftJoin("users", "user_id", "users.id")
        .selectAll()
        .execute();
    console.log(dRes[0]);
    // users.forEach(async (user) => {
    //     const id = `${user.provider}:${user.providerAccountId}`;
    //     const userId = user.id as string;
    //     if (!userId) return;
    //     const res = await db
    //         .insertInto("auth_key")
    //         .values({
    //             id,
    //             user_id: user.id,
    //         })
    //         .execute();
    //     console.log(res);
    // });
};
migrateNextAuthToLucia();
