import { Route } from "../../type";
import { pulse } from "./pulse";
import { sessionPost } from "./post";
import { sessionEndPost } from "./session-end"



export const sessionRoute: Route = {
    "POST": sessionPost
}


export const sessionEnd: Route = {
    "POST": sessionEndPost
}

export const pulseRoute: Route = {
    "POST": pulse
}