import { z } from "zod";

import { encrypt } from "@/lib/crypto";
import { db } from "@/lib/db";
import { apiErrorMessages } from "@/lib/messages";
import { rateLimitCheck } from "@/lib/rate-limit";
import { rootApiSchema } from "@/lib/validations/api";
import cors, { corsHeaders } from "@/lib/cors";

const eventsApiSchema = rootApiSchema.merge(
    z.object({
        orderBy: z
            .record(z.enum(["createdAt", "updatedAt", "id"]), z.enum(["asc", "desc"]))
            .default({
                createdAt: "desc",
            }),
        where: z
            .object({
                id: z.string().optional(),
                sessionId: z.string().optional(),
                page: z.string().optional(),
                visitorId: z.string().optional(),
            })
            .default({}),
        include: z
            .object({
                session: z.boolean().default(false),
            })
            .default({
                session: false,
            }),
    }),
);

export const POST = async (req: Request) => {
    try {
        const body = await req.json().catch((e) => {
            throw new Error(apiErrorMessages["JSON-parse-error"]);
        });
        const schema = eventsApiSchema.safeParse(body);
        if (schema.success) {
            const apiKey = schema.data.apiKey;
            const res = await db.apiKey.findFirst({
                where: {
                    AND: {
                        key: apiKey,
                        expires: {
                            gt: new Date(),
                        },
                    },
                },
            });
            if (!res) {
                return new Response(
                    JSON.stringify({
                        message: apiErrorMessages["Invalid-api-key"],
                    }),
                    {
                        status: 401,
                        statusText: "Unauthorized",
                        headers: corsHeaders,
                    },
                );
            }
            const rateLimit = await rateLimitCheck(apiKey);
            if (!rateLimit)
                return new Response(
                    JSON.stringify({
                        message: apiErrorMessages["Rate-limit-exceeded"],
                    }),
                    {
                        status: 429,
                        headers: corsHeaders,
                    },
                );
            const { take, skip, orderBy, include, where } = schema.data;
            const events = await db.webEvent
                .findMany({
                    where: {
                        websiteId: res.websiteId,
                        ...where,
                    },
                    take,
                    skip,
                    orderBy: [orderBy],
                    include: {
                        WebSession: include.session,
                    },
                })
                .then((res) => {
                    return res.map((item) => {
                        const { WebSession, ...newItem } = item;
                        return {
                            ...newItem,
                            payload: JSON.parse(item.payload),
                            session: WebSession,
                        };
                    });
                });
            return new Response(JSON.stringify(events), {
                status: 200,
                headers: corsHeaders,
            });
        } else {
            return new Response(
                JSON.stringify({
                    message: schema.error.message,
                }),
                {
                    status: 400,
                    statusText: "Bad Request",
                    headers: corsHeaders,
                },
            );
        }
    } catch (e: any) {
        return new Response(
            JSON.stringify({
                message: e.message ?? apiErrorMessages["Internal-server-error"],
            }),
            {
                status: 500,
                statusText: "Internal Server Error",
                headers: corsHeaders,
            },
        );
    }
};

export async function OPTIONS(request: Request) {
    return cors(
        request,
        new Response(null, {
            status: 204,
        }),
    );
}
