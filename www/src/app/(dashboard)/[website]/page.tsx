import React from "react";
import Loglib from "@/components/loglib-dashboard";
import { siteConfig } from "@/config/site";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export default async function Dashboard({ params }: { params: { website: string } }) {
    const user = await getCurrentUser()
    if (!user) {
        return redirect("/")
    }
    const website = await db.website.findFirst({
        where: {
            AND: {
                userId: user.id,
                id: params.website
            }
        },
        include: {
            WebSession: {
                select: {
                    id: true
                },
                take: 1
            }
        }
    })
    if (!website) {
        return notFound()
    }
    return (
        <main>
            <Loglib website={website} showHowTo={!website.WebSession.length} />
        </main>

    )
}