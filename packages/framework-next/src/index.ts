import { NextApiRequest, NextApiResponse } from "next"
import { LogLibOptions } from "@loglib/core"
import { internalRouter } from "@loglib/core"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const LogLib = (options: LogLibOptions) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        if (!req.method) {
            return res.status(400).json({ message: "bad request" })
        }
        try {
            //parse body
            const body = JSON.parse(req.body as string) as Record<string, string>
            req.body = body
            const response = await internalRouter(req, options)
            return res.status(response.code).json({ message: response.message })
        } catch (e) {
            return res.status(400).json({ message: "bad request" })
        }
    }
}

const Next13 = (options: LogLibOptions) => {
    return async (req: Request) => {
        try {
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
            return NextResponse.json({ message: internalResponse }, { status: 200 })
        } catch (e) {
            return NextResponse.json({ message: e }, { status: 400 })
        }
    }
}
export { LogLib, Next13 };