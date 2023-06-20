import { getIpAddress } from "../routes/session/detect/getIpAddress";
import isLocalhost from "../routes/session/detect/isLocalHost";
import { Middleware } from "./type";



export const disallowLocalHost: Middleware = async (req, options, next) => {
    const ipAddress = getIpAddress(req)
    if (options.environment === "test") {
        return await next(req, options)
    }
    if (!ipAddress || await isLocalhost(ipAddress)) {
        return {
            message: "Localhost is detected and not allowed. Pass environment=test to allow localhost.",
            code: 200
        }
    }
    return await next(req, options)
}