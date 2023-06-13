/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ApiRequest, LogLibOptions } from "../types";
import { disallowLocalHost } from "./middleware/localhost";
import { router } from "./router";
import { authMiddleware } from "./middleware/auth"


export const internalRouter = async (req: ApiRequest<any, any>, options: LogLibOptions) => {
    if (!req.method) {
        return { message: "Invalid request method. Expected a string.", code: 400 }
    }

    const method = req.method.toUpperCase() as "POST" | "PUT" | "DELETE" | "GET"
    let path = ""
    if (method === "POST" || method === "PUT" || method === "DELETE") {
        if (typeof req.body !== 'object' || Array.isArray(req.body)) {
            return { message: "Invalid request body. Expected an object.", code: 400 }
        }
        if (!req.body.path) {
            return { message: "Path not specified", code: 400 }
        }
        path = req.body.path as string
    } else if (req.method === "GET") {

        if (!req.query.path) {
            return { message: "Path not specified", code: 400 }
        }
        path = req.query.path as string
    }
    const route = router[path]
    if (!route) {
        return { message: "Path doesn't exist", code: 400 }
    }
    const handler = route[method]
    if (!handler) {
        return { message: "Handler doesn't implement this method!", code: 400 }
    }
    if (options.auth && route.meta?.auth) {
        const res = await authMiddleware(req, options, handler)
        return res
    }
    if (route.meta?.disallowLocalhost) {
        const res = await disallowLocalHost(req, options, handler)
        return res
    }
    const res = await handler(req, options)
    return res
}