import { ApiRequest, LogLibOptions } from "../..";
import { getIpAddress } from "../routes/session/detect/getIpAddress";
import isLocalhost from "../routes/session/detect/isLocalHost";
import { ApiGetHandler, ApiPostHandler } from "../type";



export const disallowLocalHost = async (req: ApiRequest<any, any>, options: LogLibOptions, next: ApiGetHandler<any, any> | ApiPostHandler<any>) => {
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