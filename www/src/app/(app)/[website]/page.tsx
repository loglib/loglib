import React from "react";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { Dashboard } from "@/components/dashboard";

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
  if (website.userId === user?.id) {
    return (
      <main>
        <Dashboard website={website} isPublic={false} />
      </main>
    );
  }

  const team = await db.team.findFirst({
    where: {
      TeamWebsite: {
        some: {
          websiteId: params.website,
        },
      },
      TeamUser: {
        some: {
          userId: user?.id,
        },
      },
    },
  });

  if (team) {
    return (
      <main>
        <Dashboard website={website} isPublic={false} />
      </main>
    );
  }

  if (website?.public) {
    return (
      <main>
        <Dashboard website={website} isPublic={true} />
      </main>
    );
  }

  return redirect("/");
}
