import { Route } from "../../type";
import { userPost } from "./post";




export const userRouter: Route = {
    POST: userPost,
    meta: {
        disallowLocalhost: true
    }
}