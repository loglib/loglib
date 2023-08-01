import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { z } from "zod";

const apiKeysCtxSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
export const DELETE = async (_: Request, context: z.infer<typeof apiKeysCtxSchema>) => {
    try {
        apiKeysCtxSchema.parse(context);
        const user = await getCurrentUser();
        if (!user) return new Response(null, { status: 401 });
        const isUserOwned = await db.apiKey.findFirst({
            where: {
                AND: {
                    id: context.params.id,
                    userId: user.id,
                },
            },
        });
        if (!isUserOwned)
            return new Response(null, {
                status: 401,
            });
        await db.apiKey.delete({
            where: {
                id: context.params.id,
            },
        });
    } catch {
        return new Response(null, {
            status: 500,
        });
    }
};
