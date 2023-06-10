import type { NextApiRequest, NextApiResponse } from "next"
import { LogLibOptions, internalRouter } from "@loglib/core"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const createServer = (options: LogLibOptions) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (!req.method) {
            return res.status(400).json({ message: "bad request" })
        }
        if (options.cors) {
            res.setHeader('Access-Control-Allow-Origin', options.cors.origin)
        }
        if (req.method === "POST") {
            //parse body
            const body = JSON.parse(req.body as string) as Record<string, string>
            req.body = body
            const response = await internalRouter(req, options)
            return res.status(response.code).json({ message: response.message })
        } else if (req.method === "GET") {
            const response = await internalRouter(req, options)
            return res.status(response.code).json({ message: response.message })
        }
    }
}

const createServerRoutes = (options: LogLibOptions) => {
    const fn = async (req: Request) => {
        options.cors && req.headers.set('Access-Control-Allow-Origin', '*')
        const body = await req.json().catch(() => {
            //this will fail if it's get request so we pass
        }).then(res => res as Record<string, string>)
        const header = Object.fromEntries(new Headers(req.headers))
        const query = new URLSearchParams(req.url.split("?")[1])
        const queryObject = Object.fromEntries(query.entries());
        const internalResponse = await internalRouter({
            body, headers: header, method: req.method,
            query: queryObject,
            cookies: cookies()
        }, options)
        return NextResponse.json({ ...internalResponse }, { status: internalResponse.code ?? 200 })
    }
    return { POST: fn, GET: fn }
}
export { createServer, createServerRoutes };