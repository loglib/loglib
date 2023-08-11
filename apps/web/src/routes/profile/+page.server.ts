// routes/+page.server.ts
import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) throw redirect(302, "/login");
    return {
        userId: session.user.userId,
        githubUsername: session.user.githubUsername,
    };
};
