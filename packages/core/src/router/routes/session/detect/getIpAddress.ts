import requestIp from "request-ip"
import { ApiRequest } from "../../../..";


export function getIpAddress(req: ApiRequest<unknown, any>) {
    // manual override
    if (req.headers[process.env.CLIENT_IP_ADDRESS as string]) {
        return req.headers[process.env.CLIENT_IP_ADDRESS as string] as string;
    }
    if (process.env.NODE_ENV === 'development') return ''
    // Cloudflare
    else if (req.headers['cf-connecting-ip']) {
        return req.headers['cf-connecting-ip'] as string;
    }
    return requestIp.getClientIp(req);
}