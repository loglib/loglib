import { auth, googleAuth } from "$lib/services/auth/lucia";
import { OAuthRequestError } from "@lucia-auth/oauth";

export const GET = async ({ url, cookies, locals }) => {
    const storedState = cookies.get("google_oauth_state");
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");
    if (!storedState || !state || storedState !== state || !code) {
        return new Response(null, {
            status: 400,
        });
    }
    try {
        const { existingUser, googleUser, createUser } = await googleAuth.validateCallback(code);
        const getUser = async () => {
            if (existingUser) return existingUser;
            const user = await createUser({
                attributes: {
                    name: googleUser.name,
                    email: googleUser.email ?? null,
                    image: googleUser.picture,
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
