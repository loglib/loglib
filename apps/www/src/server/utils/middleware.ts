import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { ROLE } from "@prisma/client";
import { User } from "next-auth";

export const protectedAction = async <T>(
    fn: (user: User) => Promise<T>,
    withRole?: { role: ROLE[]; teamId: string },
) => {
    const user = await getCurrentUser();
    if (!user) {
        return null;
    } else {
        if (withRole) {
            const teamUser = await checkRole(user, withRole.teamId, withRole.role);
            if (!teamUser) {
                return null;
            }
        }
        return await fn(user);
    }
};

export const checkRole = async (user: User, teamId: string, role: ROLE[]) => {
    const teamUser = await db.teamUser.findFirst({
        where: {
            AND: {
                userId: user.id,
                teamId,
                role: {
                    in: role,
                },
            },
        },
    });
    return teamUser;
};
