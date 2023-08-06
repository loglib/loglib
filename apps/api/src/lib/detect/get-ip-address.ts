import { HonoRequest } from "hono";
import requestIp from "request-ip";

export function getIpAddress(req: HonoRequest) {
    // manual override
    if (process.env.CLIENT_IP_ADDRESS as string) {
        return process.env.CLIENT_IP_ADDRESS;
    }
    if (process.env.NODE_ENV === "development") return "";
    // Cloudflare
    else if (req.headers["cf-connecting-ip"]) {
        return req.headers["cf-connecting-ip"] as string;
    }
    return requestIp.getClientIp(req);
}
