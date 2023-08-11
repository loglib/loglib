import { auth, githubAuth } from "$lib/services/auth/lucia";
import { OAuthRequestError } from "@lucia-auth/oauth";

interface GitHubEmail {
    email: string;
    primary: boolean;
    verified: boolean;
    visibility: "public" | "private";
}

export const GET = async ({ url, cookies, locals }) => {
    const storedState = cookies.get("github_oauth_state");
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");
    if (!storedState || !state || storedState !== state || !code) {
        return new Response(null, {
            status: 400,
        });
    }
    try {
        const { existingUser, githubUser, createUser, githubTokens } =
            await githubAuth.validateCallback(code);
        const getUser = async () => {
            if (existingUser) return existingUser;
            if (!githubUser.email) {
                const res = await fetch("https://api.github.com/user/emails", {
                    headers: {
                        Authorization: `Bearer ${githubTokens.accessToken}`,
                        "User-Agent": "lucia",
                    },
                });
                if (res.ok) {
                    const emails: GitHubEmail[] = await res.json();
                    console.log(emails);
                    githubUser.email = (emails.find((e) => e.primary) ?? emails[0]).email;
                }
            }
            const user = await createUser({
                attributes: {
                    name: githubUser.name,
                    email: githubUser.email,
                    image: githubUser.avatar_url,
                },
            });
            return user;
        };
        const user = await getUser();
        const session = await auth.createSession({
            userId: user.userId,
            attributes: {},
        });
        locals.auth.setSession(session);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/",
            },
        });
    } catch (e) {
        console.log(e);
        if (e instanceof OAuthRequestError) {
            // invalid code
            return new Response(null, {
                status: 400,
            });
        }
        return new Response(null, {
            status: 500,
        });
    }
};
