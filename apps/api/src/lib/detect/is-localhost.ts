import { Socket, createSocket } from "dgram";
import { ADDRCONFIG, lookup } from "dns";
import { isIP, isIPv4 } from "net";

/**
 * Addresses reserved for private networks
 * @see {@link https://en.wikipedia.org/wiki/Private_network}
 * @see {@link https://en.wikipedia.org/wiki/Unique_local_address}
 */
const IP_RANGES: RegExp[] = [
    // 10.0.0.0 - 10.255.255.255
    /^(:{2}f{4}:)?10(?:\.\d{1,3}){3}$/,
    // 127.0.0.0 - 127.255.255.255
    /^(:{2}f{4}:)?127(?:\.\d{1,3}){3}$/,
    // 169.254.1.0 - 169.254.254.255
    /^(::f{4}:)?169\.254\.([1-9]|1?\d\d|2[0-4]\d|25[0-4])\.\d{1,3}$/,
    // 172.16.0.0 - 172.31.255.255
    /^(:{2}f{4}:)?(172\.1[6-9]|172\.2\d|172\.3[01])(?:\.\d{1,3}){2}$/,
    // 192.168.0.0 - 192.168.255.255
    /^(:{2}f{4}:)?192\.168(?:\.\d{1,3}){2}$/,
    // fc00::/7
    /^f[cd][\da-f]{2}(::1$|:[\da-f]{1,4}){1,7}$/,
    // fe80::/10
    /^fe[89ab][\da-f](::1$|:[\da-f]{1,4}){1,7}$/,
];

// Concat all RegExes from above into one
const IP_TESTER_RE = new RegExp(`^(${IP_RANGES.map((re) => re.source).join("|")})$`);

/**
 * Syntax validation RegExp for possible valid host names. Permits underscore.
 * Maximum total length 253 symbols, maximum segment length 63 symbols
 * @see {@link https://en.wikipedia.org/wiki/Hostname}
 */
const VALID_HOSTNAME =
    /(?![\w-]{64})((^(?=[-\w.]{1,253}\.?$)((\w{1,63}|(\w[-\w]{0,61}\w))\.?)+$)(?<!\.{2}))/;

/**
 *
 * @param {string} ip
 * @returns {Promise<boolean>}
 */
async function canBindToIp(ip: string): Promise<boolean> {
    const socket: Socket = createSocket(isIPv4(ip) ? "udp4" : "udp6");
    return new Promise((resolve) => {
        try {
            socket
                .once("error", () => socket.close(() => resolve(false)))
                .once("listening", () => socket.close(() => resolve(true)))
                .unref()
                .bind(0, ip);
        } catch {
            socket.close(() => resolve(false));
        }
    });
}

/**
 * Checks if given strings is a local IP address or a DNS name that resolve into a local IP
 *
 * @param {string} ipOrHostname
 * @param {boolean} [canBind=false] - should check whether an interface with such address exists on the local machine
 * @returns {Promise.<boolean>} - true, if given strings is a local IP address or DNS names that resolves to local IP
 */
async function isLocalhost(ipOrHostname: string, canBind = false): Promise<boolean> {
    if (typeof ipOrHostname !== "string") return false;

    // Check if given string is an IP address
    if (isIP(ipOrHostname)) {
        if (IP_TESTER_RE.test(ipOrHostname) && !canBind) return true;
        return canBindToIp(ipOrHostname);
    }

    // May it be a hostname?
    if (!VALID_HOSTNAME.test(ipOrHostname)) return false;

    // it's a DNS name
    try {
        const addresses = lookup(ipOrHostname, {
            //@ts-expect-error
            all: true,
            verbatim: true,
            family: 0,
            hints: ADDRCONFIG,
        });
        if (!Array.isArray(addresses)) return false;
        for (const { address } of addresses) {
            if (await isLocalhost(address as string, canBind)) return true;
        }
        // eslint-disable-next-line no-empty
    } catch {}
    return false;
}

export default isLocalhost;
export { VALID_HOSTNAME };
