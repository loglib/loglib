import { Dashboard } from "@/components/dashboard";
import { getIsWebsiteActive } from "@/lib/clickhouse";
import { generateToken } from "@/lib/generate-token";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page({
    params,
}: {
    params: { website: string };
}) {
    const user = await getCurrentUser();
    const token = generateToken({
        id: user?.id ?? "public",
        website: params.website as string,
    });
    const dbWebsite = await db
        .selectFrom("website")
        .leftJoin("teamWebsite", "teamWebsite.websiteId", "website.id")
        .leftJoin("teamUsers", "teamWebsite.id", "teamUsers.teamId")
        .select([
            "website.id",
            "website.public",
            "website.title",
            "website.active",
            "website.userId",
            "website.url",
            "teamWebsite.teamId",
            "teamUsers.userId as teamUserId",
            "teamUsers.role",
        ])
        .where("website.id", "=", params.website)
        .execute();
    const website = dbWebsite.find((d) => d.id === params.website);
    const isAuthed = dbWebsite.find((d) => d.userId === user?.id || d.teamUserId === user?.id);
    if (!website || (!isAuthed && !dbWebsite[0].public)) {
        return redirect("/");
    }
    const isPublic = !isAuthed ? true : false;
    const showSetup = isPublic
        ? false
        : website.active === 1
        ? false
        : await (async () => {
              const haveSession = (await getIsWebsiteActive({ websiteId: params.website })).length;
              if (haveSession) {
                  await db
                      .updateTable("website")
                      .set({
                          active: 1,
                      })
                      .where("id", "=", params.website)
                      .executeTakeFirst();
                  return false;
              }
              return true;
          })();
    return (
        <main>
            <Dashboard website={website} isPublic={isPublic} showSetup={showSetup} token={token} />
        </main>
    );
}
