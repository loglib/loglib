import { eventRouter } from "./routes/event";
import { insightsRoutes } from "./routes/dashboard";
import { pageViewRoute } from "./routes/pageview";
import { pulseRoute, sessionRoute } from "./routes/session";
import { userRouter } from "./routes/user";
import { Router } from "./type";


//routes should be registered here

export const router: Router = {
    "/session": sessionRoute,
    "/session/pulse": pulseRoute,
    "/pageview": pageViewRoute,
    "/event": eventRouter,
    "/user": userRouter,
    "/test": {
        "POST": async () => Promise.resolve({ message: 'test', code: 200 })
    },
    "/dashboard": insightsRoutes,
}