import { env } from "env.mjs"
import { NextResponse } from "next/server"


export const GET = async (req: Request) => {
    const query = req.url.split("?")[1]
    return new Response(null, {
        status: 302,
        headers: {
            location: env.NEXT_PUBLIC_API_URL + "?" + query
        }
    })
}

//older sdk uses this endpoint
export const POST = async (req: Request) => {
    const header = Object.fromEntries(req.headers)
    const body = await req.text()
    return new Response(body, {
        status: 302,
        headers: {
            ...header,
            location: env.NEXT_PUBLIC_API_URL
        }
    })
}