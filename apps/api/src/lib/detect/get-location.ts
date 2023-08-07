import { CityResponse, Reader } from "maxmind";
import path from "path";
import maxmind from "maxmind";
import { HonoRequest } from "hono";
import { ApiRequest } from "../../routes/type";

let lookup: Reader<CityResponse> | null;
export async function getLocation(ip: string, req: ApiRequest) {
    //vercel
    if (req.headers["x-vercel-ip-country"]) {
        const country = req.headers["x-vercel-ip-country"] as string;
        const region = req.headers["x-vercel-ip-country-region"] as string;
        const city = req.headers["x-vercel-ip-city"] as string;
        return {
            country,
            region,
            city: city ? decodeURIComponent(city) : null,
        };
    }
    //cloudflare
    if (req.headers["cf-ipcountry"]) {
        const country = req.headers["cf-ipcountry"] as string;
        const city = req.headers["cf-ipcity"] as string;
        return {
            country,
            city: city,
        };
    }
    // Database lookup
    if (!lookup) {
        try {
            const dir = path.join(process.cwd(), "geo");
            lookup = await maxmind.open(path.resolve(dir, "GeoLite2-City.mmdb"));
        } catch {
            throw new Error("Couldn't find maxmind db");
        }
    }
    const result = lookup.get(ip);
    if (result) {
        return {
            country: result.country?.iso_code ?? result?.registered_country?.iso_code ?? null,
            city:
                result.city?.names?.en.replace("_", " ") ||
                result.location?.time_zone?.split("/")[1].replace("_", " ") ||
                null,
            region: null,
        };
    } else {
        console.log("couldn't find ip location...");
        return {
            country: "unknown",
            city: "unknown",
            region: null,
        };
    }
}

export const checkLocationConfig = async (req: HonoRequest) => {
    if (req.headers["x-vercel-ip-country"]) return;
    const dir = path.join(process.cwd(), "geo");
    try {
        await maxmind.open(path.resolve(dir, "GeoLite2-City.mmdb"));
    } catch {
        throw new Error(
            "LogLib encountered an error while trying to resolve the location of the user. To resolve this issue, you can either set up the MaxMind database by running 'loglib setup:maxmind', or provide a custom implementation. Alternatively, you can disable location resolution from IP by modifying the server configuration.",
        );
    }
};
