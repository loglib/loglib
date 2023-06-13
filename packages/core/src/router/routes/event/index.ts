import { Route } from "../../type";
import { getEvent } from "./get";
import { postEvent } from "./post";



export const eventRouter: Route = {
    POST: postEvent,
    GET: getEvent,
    meta: {
        disallowLocalhost: true
    }
}