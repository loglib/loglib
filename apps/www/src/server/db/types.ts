import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { ROLE, INVITE_STATUS } from "./enums";

export type Account = {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refreshToken: string | null;
    accessToken: string | null;
    expiresAt: number | null;
    tokenType: string | null;
    scope: string | null;
    idToken: string | null;
    sessionState: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type ApiKey = {
    id: string;
    userId: string;
    name: string;
    websiteId: string;
    createdAt: Generated<Timestamp>;
    deletedAt: Timestamp | null;
    expires: Timestamp;
    key: string;
};
export type auth_key = {
    id: string;
    userId: string;
    hashedPassword: string | null;
};
export type auth_session = {
    id: string;
    userId: string;
    activeExpires: number;
    idleExpires: number;
};
export type Disallowed = {
    id: string;
    identity: string;
};
export type Session = {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Timestamp;
};
export type Team = {
    id: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    name: string;
};
export type TeamUser = {
    id: string;
    teamId: string;
    userId: string;
    role: Generated<ROLE>;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    accepted: Generated<number>;
};
export type TeamUserInvite = {
    id: string;
    teamId: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    token: string;
    userId: string;
    teamUserId: string;
    status: Generated<INVITE_STATUS>;
};
export type TeamWebsite = {
    id: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    teamId: string;
    websiteId: string;
};
export type User = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Timestamp | null;
    image: string | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    stripePriceId: string | null;
    stripeCurrentPeriodEnd: Timestamp | null;
};
export type VerificationToken = {
    identifier: string;
    token: string;
    expires: Timestamp;
};
export type Website = {
    id: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    url: string;
    title: string | null;
    userId: string;
    active: Generated<number>;
    public: Generated<number>;
};
export type DB = {
    accounts: Account;
    apiKey: ApiKey;
    authKey: auth_key;
    authSession: auth_session;
    Disallowed: Disallowed;
    sessions: Session;
    team: Team;
    teamUserInvite: TeamUserInvite;
    teamUsers: TeamUser;
    teamWebsite: TeamWebsite;
    users: User;
    verificationTokens: VerificationToken;
    website: Website;
};
