// lucia.ts
import { lucia } from "lucia";
import "lucia/polyfill/node";
import { planetscale } from "@lucia-auth/adapter-mysql";
import { connection } from "../db";
import { sveltekit } from "lucia/middleware";
import { github } from "@lucia-auth/oauth/providers";
import { google } from "@lucia-auth/oauth/providers";
import {
    PUBLIC_APP_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET, //@ts-ignore
} from "$env/static/private";

export const auth = lucia({
    adapter: planetscale(connection, {
        user: "users",
        key: "auth_key",
        session: "auth_session",
    }),
    env: import.meta.env.DEV ? "DEV" : "PROD",
    middleware: sveltekit(),
    getUserAttributes: (data) => {
        return {
            name: data.name,
            email: data.email,
            image: data.image,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    },
});

export const githubAuth = github(auth, {
    clientId: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    scope: ["read:user", "user:email"],
});

export const googleAuth = google(auth, {
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    redirectUri: `${PUBLIC_APP_URL}/login/google/callback`,
    scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "openid",
        "https://www.googleapis.com/auth/userinfo.profile",
    ],
});

export type Auth = typeof auth;
