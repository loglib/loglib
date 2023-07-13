import { z } from "zod"

import { db } from "@/lib/db"
import { apiErrorMessages } from "@/lib/messages"
import { rateLimitCheck } from "@/lib/rate-limit"
import { transformToISO } from "@/lib/validations/api"
import cors from "@/lib/cors"

const sessionApiSchema = z.object({
  apiKey: z.string({
    required_error: apiErrorMessages["Missing-api-key"],
  }),
  take: z.number().default(10),
  skip: z.number().default(0),
  orderBy: z
    .record(
      z.enum(["createdAt", "updatedAt", "id", "device", "os"]),
      z.enum(["asc", "desc"])
    )
    .default({
      createdAt: "desc",
    }),
  where: z
    .object({
      id: z.string().optional(),
      createdAt: z
        .object({
          gt: z.string().optional().transform(transformToISO),
          lt: z.string().optional().transform(transformToISO),
          gte: z.string().optional().transform(transformToISO),
          lte: z.string().optional().transform(transformToISO),
        })
        .optional(),
      device: z.string().optional(),
      city: z.string().optional(),
      country: z.string().optional(),
      referrer: z.string().optional(),
      browser: z.string().optional(),
      os: z.string().optional(),
      visitorId: z.string().optional(),
      pageviewId: z.string().optional(),
    })
    .default({}),
  include: z
    .object({
      pageView: z.boolean().default(false),
      event: z.boolean().default(false),
      visitors: z.boolean().default(false),
    })
    .default({
      pageView: false,
      event: false,
      visitors: false,
    }),
})

export const POST = async (req: Request) => {
  try {
    const body = await req.json().catch(() => {
      throw new Error(apiErrorMessages["JSON-parse-error"])
    })
    const validatedData = sessionApiSchema.safeParse(body)
    if (validatedData.success) {
      const apiKey = validatedData.data.apiKey
      const res = await db.apiKey.findFirst({
        where: {
          key: apiKey,
          expires: {
            gt: new Date(),
          },
        },
      })
      if (!res) {
        return new Response(
          JSON.stringify({
            message: apiErrorMessages["Invalid-api-key"],
          }),
          {
            status: 401,
          }
        )
      }
      const rateLimit = await rateLimitCheck(apiKey)
      if (!rateLimit)
        return new Response(
          JSON.stringify({
            message: apiErrorMessages["Rate-limit-exceeded"],
          }),
          {
            status: 429,
          }
        )
      const { take, skip, orderBy, include, where } = validatedData.data
      const session = await db.webSession
        .findMany({
          where: {
            websiteId: res.websiteId,
            ...where,
          },
          take,
          skip,
          orderBy: [orderBy],
          include: {
            WebPage: include?.pageView,
            WebEvent: include?.event,
            WebVisitor: include?.visitors,
          },
        })
        .then((res) => {
          return res.map((session) => {
            const { WebPage, WebEvent, WebVisitor, ...rest } = session
            return {
              ...rest,
              pageView: WebPage,
              event: WebEvent,
              visitor: WebVisitor,
            }
          })
        })
      return new Response(JSON.stringify(session), {
        status: 200,
      })
    } else {
      return new Response(
        JSON.stringify({
          message: validatedData.error.issues,
        }),
        {
          status: 400,
          statusText: "Bad Request",
        }
      )
    }
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        message: e.message ?? apiErrorMessages["Internal-server-error"],
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
  }
}

export async function OPTIONS(request: Request) {
  return cors(
    request,
    new Response(null, {
      status: 204,
    })
  )
}
