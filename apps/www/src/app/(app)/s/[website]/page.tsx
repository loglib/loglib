import { Dashboard } from "@/components/dashboard";
import { generateToken } from "@/lib/generate-token";
import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import { schema } from "@loglib/db";
import { eq } from "drizzle-orm";
import { queries } from "@/server/query/queries";
import { PLAN } from "@loglib/types/models";

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
    const websites = await db.query.website.findMany({
        with: {
            teamWebsites: {
                with: {
                    team: {
                        with: {
<<<<<<< HEAD:apps/www/src/app/(app)/[website]/page.tsx
                            teamMembers: true,
                        },
                    },
                },
            },
        },
    });
=======
                            teamMembers: true
                        }
                    }
                }
            },
            user: {
                columns: {
                    plan: true
                }
            }
        }
    })
>>>>>>> original/main:apps/www/src/app/(app)/s/[website]/page.tsx

    const website = websites.find(
        (d) =>
            d.id === params.website || d.teamWebsites.find((tw) => tw.websiteId === params.website),
    );
    const isAuthed = websites.find((d) => d.userId === user?.id);
    if (!website || (!isAuthed && website.public)) {
        return redirect("/");
    }
    const isPublic = website.public;
    const showSetup = isPublic
        ? false
        : website.active
<<<<<<< HEAD:apps/www/src/app/(app)/[website]/page.tsx
        ? false
        : await (async () => {
              const haveSession = (await queires.getIsWebsiteActive(params.website)).length;
              if (haveSession) {
                  await db
                      .update(schema.website)
                      .set({
                          active: true,
                      })
                      .where(eq(schema.website.id, params.website));
                  return false;
              }
              return true;
          })();
=======
            ? false
            : await (async () => {
                const haveSession = (await queries.getIsWebsiteActive(params.website)).length;
                if (haveSession) {
                    await db.update(schema.website).set({
                        active: true
                    }).where(eq(schema.website.id, params.website));
                    return false;
                }
                return true;
            })();
>>>>>>> original/main:apps/www/src/app/(app)/s/[website]/page.tsx
    return (
        <main>
            <Dashboard website={{
                ...website,
                plan: website.user.plan as PLAN
            }} isPublic={isPublic} showSetup={showSetup} token={token} />
        </main>
    );
}