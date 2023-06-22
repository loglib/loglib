import { Route } from "../../type";
import { visitorPost } from "./post";




export const visitorRouter: Route = {
    POST: visitorPost,
    meta: {
        disallowLocalhost: true
    }
}