import { Route } from "../../type";
import { sessionPost } from "./post";
import { sessionEndPost } from "./session-end"



export const sessionRoute: Route = {
    "POST": sessionPost
}


export const sessionEnd: Route = {
    "POST": sessionEndPost
}