import requestIp from "request-ip"
import { ApiRequest } from "../../../..";


export function getIpAddress(req: ApiRequest<unknown>) {
    if (process.env.NODE_ENV === 'development') return ''
    // Custom header
    if (req.headers[process.env.CLIENT_IP_HEADER as string]) {
        return req.headers[process.env.CLIENT_IP_HEADER as string] as string;
    }
    // Cloudflare
    else if (req.headers['cf-connecting-ip']) {
        return req.headers['cf-connecting-ip'] as string;
    }
    return requestIp.getClientIp(req);
}
