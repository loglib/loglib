import { env } from "../../env.mjs";
import { db } from "@/lib/drizzle";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(db) as any,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,

    },
    secret: env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/dashboard",
    },
    providers: [
        GitHubProvider({
            clientId: env.GITHUB_CLIENT_ID ?? "",
            clientSecret: env.GITHUB_CLIENT_SECRET ?? "",
            allowDangerousEmailAccountLinking: true

        }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: env.GOOGLE_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
            allowDangerousEmailAccountLinking: true
        }),

    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            return session;
        },
        async jwt({ token, user }) {
            const dbUser = await db.query.users.findFirst({
                where(fields, operators) {
                    return operators.eq(fields.email, token.email as string)
                },
            });
            if (!dbUser) {
                if (user) {
                    token.id = user?.id;
                }
                return token;
            }
            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            };
        },
    },
};
