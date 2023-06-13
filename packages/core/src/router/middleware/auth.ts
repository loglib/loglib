import { ApiRequest, LogLibOptions } from "../..";
import jwt from 'jsonwebtoken'
import { ApiGetHandler, ApiPostHandler } from "../type";




export const authMiddleware = async (req: ApiRequest<any, any>, options: LogLibOptions, next: ApiGetHandler<any, any> | ApiPostHandler<any>) => {
    if (!options.auth) return await next(req, options);
    const { authorization } = req.headers as { authorization: string };
    if (authorization) {
        const token = authorization.replace("Bearer ", "");
        try {
            jwt.verify(token, options.auth.secret)
        } catch (e) {
            return { message: "Unauthorized", code: 401 }
        }
        return await next(req, options);
    } else {
        return { message: "Unauthorized", code: 401 }
    }
}