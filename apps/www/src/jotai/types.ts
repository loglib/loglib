import { Team, TeamUser, User } from "@prisma/client";

export type TeamWithUsers = Team & {
    TeamUser: (TeamUser & {
        User: User;
    })[];
};