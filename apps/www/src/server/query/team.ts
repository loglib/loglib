import { db } from "@/lib/drizzle";
import { getCurrentUser } from "@/lib/session";

export const getTeams = async () => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("User not found");
    }
    // const teams = await db.team
    //     .findMany({
    //         where: {
    //             TeamUser: {
    //                 some: {
    //                     AND: {
    //                         userId: user.id,
    //                         accepted: true,
    //                     },
    //                 },
    //             },
    //         },
    //         include: {
    //             TeamUser: {
    //                 select: {
    //                     id: true,
    //                     accepted: true,
    //                     role: true,
    //                     userId: true,
    //                     createdAt: true,
    //                     User: {
    //                         select: {
    //                             name: true,
    //                             email: true,
    //                             id: true,
    //                         },
    //                     },
    //                 },
    //             },
    //             TeamWebsite: {
    //                 include: {
    //                     Website: {
    //                         select: {
    //                             id: true,
    //                             title: true,
    //                         },
    //                     },
    //                 },
    //             },
    //         },
    //     })
    //     .then((res) =>
    //         res.map((team) => ({
    //             ...team,
    //             TeamUser: team.TeamUser.map((teamUser) => ({
    //                 ...teamUser,
    //                 name: teamUser.User.name,
    //                 email: teamUser.User.email,
    //             })),
    //         })),
    //     );
    const teams = await db.query.teamMember.findMany({
        where(fields, operators) {
            return operators.and(
                operators.eq(fields.userId, user.id),
                operators.eq(fields.accepted, true)
            )
        },
        with: {
            website: true,
            team: true,
        }
    })

    return teams;
};
export type Teams = Awaited<ReturnType<typeof getTeams>>;
