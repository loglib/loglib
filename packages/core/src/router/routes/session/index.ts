import { Route } from "../../type";
import { pulse } from "./pulse";
import { sessionPost } from "./post";



export const sessionRoute: Route = {
    "POST": sessionPost,
    meta: {
        disallowLocalhost: true
    }
}



export const pulseRoute: Route = {
    "POST": pulse,
    meta: {
        disallowLocalhost: true
    }
}