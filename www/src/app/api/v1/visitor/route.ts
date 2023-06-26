import { encrypt } from "@/lib/crypto";
import { db } from "@/lib/db";
import { apiErrorMessages } from "@/lib/messages";
import { rateLimitCheck } from "@/lib/rate-limit";
import { transformToISO } from "@/lib/validations/api";
import { z } from "zod";

const visitorApiSchema = z.object({
    apiKey: z.string({
        required_error: apiErrorMessages["Missing-api-key"]
    }),
    take: z.number().default(10),
    skip: z.number().default(0),
    orderBy: z.record(z.enum(["createdAt", "updatedAt", "id", "device", "os"]), z.enum(['asc', 'desc'])).default({
        createdAt: "desc"
    }),
    where: z.object({
        id: z.string().optional(),
        createdAt: z.object({
            gt: z.string().optional().transform(transformToISO),
            lt: z.string().optional().transform(transformToISO),
            gte: z.string().optional().transform(transformToISO),
            lte: z.string().optional().transform(transformToISO),
        }).optional(),
        payload: z.record(z.string(), z.string()).optional().transform((val) => {
            if (!val) return val
            return JSON.stringify(val)
        }),
    }).default({}),
    include: z.object({
        pageview: z.boolean().default(false),
        event: z.boolean().default(false),
        session: z.boolean().default(false),
    }).default({
        pageview: false,
        event: false,
        session: false
    })
})

export const POST = async (req: Request) => {
    try {
        const body = await req.json().catch(() => { throw new Error(apiErrorMessages["JSON-parse-error"]) })
        const validatedData = visitorApiSchema.safeParse(body)
        if (validatedData.success) {
            const apiKey = validatedData.data.apiKey
            const res = await db.apiKey.findFirst({
                where: {
                    key: encrypt(apiKey),
                    expires: {
                        gt: new Date()
                    }
                }
            })
            if (!res) {
                return new Response(JSON.stringify({
                    message: apiErrorMessages["Invalid-api-key"]
                }), {
                    status: 401,
                })
            }
            const rateLimit = await rateLimitCheck(apiKey)
            if (!rateLimit) return new Response(JSON.stringify({
                message: apiErrorMessages["Rate-limit-exceeded"]
            }), {
                status: 429,
            })
            const { take, skip, orderBy, include, where } = validatedData.data
            const visitor = await db.webVisitor.findMany({
                where: {
                    websiteId: res.websiteId,
                    ...where
                },
                take,
                skip,
                orderBy: [orderBy],
                include: {
                    WebEvent: include.event,
                    Session: include.session,
                    Pageview: include.pageview,
                }
            })
            return new Response(JSON.stringify(visitor), {
                status: 200
            })
        } else {
            return new Response(JSON.stringify({
                message: validatedData.error.issues
            }), {
                status: 400,
                statusText: "Bad Request"
            })
        }
    } catch (e) {
        return new Response(JSON.stringify({
            message: e.message ?? apiErrorMessages["Internal-server-error"]
        }), {
            status: 500,
            statusText: "Internal Server Error"
        })
    }
}