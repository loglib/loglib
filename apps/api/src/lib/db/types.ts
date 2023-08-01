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
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type ApiKey = {
    id: string;
    userId: string;
    name: string;
    websiteId: string;
    key: string;
    created_at: Generated<Timestamp>;
    deleted_at: Timestamp | null;
    expires: Timestamp;
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
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
    name: string;
};
export type TeamUser = {
    id: string;
    team_id: string;
    user_id: string;
    role: Generated<ROLE>;
    accepted: Generated<number>;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
};
export type TeamUserInvite = {
    id: string;
    team_id: string;
    user_id: string;
    team_user_id: string;
    token: string;
    status: Generated<INVITE_STATUS>;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
};
export type TeamWebsite = {
    id: string;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
    team_id: string;
    website_id: string;
};
export type User = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Timestamp | null;
    image: string | null;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    stripe_price_id: string | null;
    stripe_current_period_end: Timestamp | null;
};
export type VerificationToken = {
    identifier: string;
    token: string;
    expires: Timestamp;
};
export type WebEvent = {
    id: string;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
    event_type: string;
    event_name: string;
    payload: Generated<string>;
    page_id: string;
    web_session_id: string;
    user_id: string;
    website_id: string;
};
export type WebPageview = {
    id: string;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
    page: string;
    referrer: Generated<string>;
    query_params: Generated<string>;
    duration: Generated<number>;
    web_session_id: string;
    user_id: string;
    website_id: string;
};
export type WebSession = {
    id: string;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
    referrer: Generated<string>;
    query_params: Generated<string>;
    duration: Generated<number>;
    country: string | null;
    city: string | null;
    device: string | null;
    os: string | null;
    browser: string | null;
    language: string | null;
    user_id: string;
    website_id: string;
};
export type Website = {
    id: string;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
    url: string;
    title: string | null;
    user_id: string;
    active: Generated<number>;
    public: Generated<number>;
};
export type WebVisitor = {
    id: string;
    data: Generated<string>;
    created_at: Generated<Timestamp>;
    updated_at: Timestamp;
    website_id: string;
};
export type DB = {
    accounts: Account;
    api_key: ApiKey;
    Disallowed: Disallowed;
    sessions: Session;
    team: Team;
    team_user_invite: TeamUserInvite;
    team_users: TeamUser;
    team_website: TeamWebsite;
    users: User;
    verification_tokens: VerificationToken;
    web_event: WebEvent;
    web_pageview: WebPageview;
    web_session: WebSession;
    web_user: WebVisitor;
    website: Website;
};
