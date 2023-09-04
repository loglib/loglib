import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { queries } from "./queries";

export const getWebsite = async () => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("User not found");
    }
    const userWebsites = await db.query.website.findMany({
        where(fields, operators) {
<<<<<<< HEAD
            return operators.eq(fields.userId, user.id);
        },
    });
=======
            return operators.eq(fields.userId, user.id)
        },
        with: {
            user: {
                columns: {
                    plan: true
                }
            }
        }
    })
>>>>>>> original/main
    const ids = userWebsites.map((website) => website.id);
    const teamWebsites = await db.query.teamWebsites
        .findMany({
            with: {
                team: {
                    with: {
                        teamMembers: {
                            where(fields, operators) {
                                return operators.and(
                                    operators.eq(fields.userId, user.id),
                                    operators.eq(fields.accepted, true),
                                );
                            },
                        },
                    },
                },
                website: true,
            },
<<<<<<< HEAD
        })
        .then((res) =>
            res.filter(
                (r) => r.team?.teamMembers?.length && r.websiteId && !ids.includes(r.websiteId),
            ),
        );
=======
            website: {
                with: {
                    user: {
                        columns: {
                            plan: true
                        }
                    }
                }
            },
        }
    }).then(res => res.filter(r => r.team?.teamMembers?.length && r.websiteId && !ids.includes(r.websiteId)))
>>>>>>> original/main

    const sites = userWebsites.map(async (web) => {
        return {
            ...web,
<<<<<<< HEAD
            visitors: await queires.getTodayVisitorsCount(web.id),
=======
            visitors: await queries.getTodayVisitorsCount(web.id),
            plan: web.user.plan ?? "free"
>>>>>>> original/main
        };
    });
    const teamSites = teamWebsites.map(async (web) => {
        return {
            // rome-ignore lint/style/noNonNullAssertion: <explanation>
            ...web.website!,
<<<<<<< HEAD
            visitors: await queires.getTodayVisitorsCount(web.websiteId as string),
=======
            visitors: await queries.getTodayVisitorsCount(web.websiteId as string),
            plan: web.website?.user.plan ?? "free"
>>>>>>> original/main
        };
    });
    return {
        teamWebsites: await Promise.all(teamSites),
        userWebsites: await Promise.all(sites),
    };
};

export type Websites = Awaited<ReturnType<typeof getWebsite>>;
