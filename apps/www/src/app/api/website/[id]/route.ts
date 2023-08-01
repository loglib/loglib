import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { websiteFormSchema } from "@/lib/validations/website";
import { getServerSession } from "next-auth";
import { z } from "zod";

const routeContextSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});

export const PATCH = async (request: Request, context: z.infer<typeof routeContextSchema>) => {
    try {
        const {
            params: { id },
        } = routeContextSchema.parse(context);
        if (!id) {
            return new Response("Id not specified", { status: 400 });
        }
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response("Unauthorized", { status: 403 });
        }
        const userWebsite = await db.website.findMany({
            where: {
                AND: {
                    userId: session.user.id,
                    id,
                },
            },
        });
        if (!userWebsite) {
            return new Response("Website not found", { status: 404 });
        }
        const body = websiteFormSchema.parse(await request.json());

        const res = await db.website.update({
            where: {
                id,
            },
            data: {
                url: body.url,
                title: body.title,
                id: body.id,
                public: body.public,
            },
        });
        if (body.team) {
            const isSiteInTeam = db.teamWebsite.findFirst({
                where: {
                    AND: {
                        teamId: body.team,
                        websiteId: body.id,
                    },
                },
            });
            if (!isSiteInTeam) {
                await db.teamWebsite.create({
                    data: {
                        websiteId: body.id,
                        teamId: body.team,
                    },
                });
            }
        }
        return new Response(JSON.stringify(res), { status: 200 });
    } catch (e) {
        console.log(e);
        return new Response(null, { status: 500 });
    }
};

export const DELETE = async (_: Request, context: z.infer<typeof routeContextSchema>) => {
    try {
        const {
            params: { id },
        } = routeContextSchema.parse(context);
        if (!id) {
            return new Response("Id not specified", { status: 400 });
        }
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response("Unauthorized", { status: 401 });
        }
        const userWebsite = await db.website.findMany({
            where: {
                AND: {
                    userId: session.user.id,
                    id,
                },
            },
        });

        if (!userWebsite) {
            return new Response("Website not found", { status: 404 });
        }
        await db.website.delete({
            where: {
                id,
            },
        });
        return new Response(null, { status: 200 });
    } catch {
        return new Response(null, { status: 500 });
    }
};
