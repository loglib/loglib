import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { websiteFormSchema } from "@/lib/validations/website"
import cors from "@/lib/cors"

export const GET = async (request: Request) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }
    const { user } = session
    const websites = await db.website.findMany({
      where: {
        userId: user.id,
      },
    })
    return new Response(JSON.stringify(websites))
  } catch {
    return new Response(null, { status: 500 })
  }
}

export const POST = async (request: Request) => {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }
    const body = websiteFormSchema.parse(await request.json())
    const { user } = session
    const disallowed = await db.disallowed.findFirst({
      where: {
        identity: body.id,
      },
    })
    if (disallowed) {
      return new Response("Website is disallowed", { status: 403 })
    }
    const website = await db.website.create({
      data: {
        id: body.id,
        userId: user.id,
        url: body.url,
        title: body.title,
      },
    })
    if (body.team) {
      await db.team.update({
        where: {
          id: body.team,
        },
        data: {
          TeamWebsite: {
            create: {
              websiteId: body.id,
            },
          },
        },
      })
    }
    return new Response(JSON.stringify(website), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (e: any) {
    if (e.code === "P2002") {
      return new Response("Website already exists", { status: 409 })
    }
    return new Response(null, { status: 500 })
  }
}
