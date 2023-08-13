import { env } from "env.mjs"

export const POST = async (req: Request) => {
    const headers = Object.fromEntries(req.headers)
    const body = await req.json()
    const res = await fetch(env.NEXT_PUBLIC_API_URL, {
        body: JSON.stringify(body),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    }).then(async (res) => await res.json())
    return new Response(JSON.stringify(res), {
        status: 200,
    })
}