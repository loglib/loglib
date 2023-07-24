import React from "react";
import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { Dashboard } from "@/components/dashboard";
import { Website } from "generated/client";

export default async function Page({
  params,
}: {
  params: { website: string };
}) {
  const user = await getCurrentUser();

  const website = await db.website.findFirst({
    where: {
      AND: {
        id: params.website,
        OR: {
          userId: user?.id,
          public: true,
        },
      },
    },
    include: {
      WebSession: {
        select: {
          id: true,
        },
        take: 1,
      },
    },
  });
  if (!website) {
    return redirect("/");
  }

  let teamWebsite:
    | (Website & {
        WebSession: {
          id: string;
        }[];
      })
    | null = null;

  if (!website) {
    teamWebsite = user
      ? await db.teamWebsite
          .findFirst({
            where: {
              websiteId: params.website,
              Team: {
                TeamUser: {
                  some: {
                    userId: user.id,
                  },
                },
              },
            },
            include: {
              Website: {
                include: {
                  WebSession: {
                    select: {
                      id: true,
                    },
                    take: 1,
                  },
                },
              },
            },
          })
          .then((res) => res?.Website ?? null)
      : null;
  }

  const site = website ?? teamWebsite;

  if (!site) {
    return notFound();
  }

  if (website?.public && !teamWebsite && user?.id !== website.userId) {
    return (
      <main>
        <Dashboard website={website} isPublic={true} />
      </main>
    );
  }

  return (
    <main>
      <Dashboard website={website} isPublic={false} />
    </main>
  );
}
