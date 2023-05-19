import { eventRouter } from "./routes/event";
import { pageViewRoute } from "./routes/pageview";
import { sessionEnd, sessionRoute } from "./routes/session";
import { userRouter } from "./routes/user";
import { Router } from "./type";


//routes should be registered here

export const router: Router = {
    "/session": sessionRoute,
    "/session/end": sessionEnd,
    "/pageview": pageViewRoute,
    "/event": eventRouter,
    "/user": userRouter,
    "/test": {
        "POST": async () => ({ message: 'test', code: 200 })
    }
}