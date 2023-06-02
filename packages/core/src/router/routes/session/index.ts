import { Route } from "../../type";
import { pulse } from "./pulse";
import { sessionPost } from "./post";



export const sessionRoute: Route = {
    "POST": sessionPost
}



export const pulseRoute: Route = {
    "POST": pulse
}