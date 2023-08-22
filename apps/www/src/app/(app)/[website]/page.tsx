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
        .leftJoin("team_website", "team_website.website_id", "website.id")
        .leftJoin("team_users", "team_website.team_id", "team_users.team_id")
        .select([
            "website.id",
            "website.public",
            "website.title",
            "website.active",
            "website.user_id",
            "website.url",
            "team_website.team_id",
            "team_users.user_id as team_user_id",
            "team_users.role",
        ])
        .where("website.id", "=", params.website)
        .execute();
    const website = dbWebsite.find((d) => d.id === params.website);
    const isAuthed = dbWebsite.find((d) => d.user_id === user?.id || d.team_user_id === user?.id);
    if (!website || (!isAuthed && !dbWebsite[0].public)) {
        return redirect("/");
    }
    const isPublic = website.public === 1;
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
