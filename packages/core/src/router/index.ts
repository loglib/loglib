import { ApiRequest, LogLibOptions } from "../types";
import { router } from "./router";
import { EventPostInput } from "./routes/event/post";
import { PageViewPostInput } from "./routes/pageview/post";
import { SessionPostInput } from "./routes/session/post";
import { sessionEndPostInput } from "./routes/session/session-end";
import { UserPostInput } from "./routes/user/post";


export const internalRouter = async (req: ApiRequest<{ path?: string }>, options: LogLibOptions) => {
    if (typeof req.body !== 'object' || Array.isArray(req.body)) {
        return { message: "Invalid request body. Expected an object.", code: 400 }
    }
    if (!req.method) {
        return { message: "Invalid request method. Expected a string.", code: 400 }
    }
    const method = req.method.toUpperCase() as "POST" | "PUT" | "DELETE" | "GET"
    if (!req.body.path) {
        return { message: "Path not specified", code: 400 }
    }
    const route = router[req.body.path]
    if (!route) {
        return { message: "Path doesn't exist", code: 400 }
    }
    const handler = route[method]
    if (!handler) {
        return { message: "Handler doesn't implement this method!", code: 400 }
    }
    const res = await handler(req, options)
    return res
}

export type TrackerTypes = {
    "/session": SessionPostInput,
    "/session-end": sessionEndPostInput,
    "/pageview": PageViewPostInput,
    "/event": EventPostInput,
    "/user": UserPostInput
}