import { CityResponse, Reader } from "maxmind";
import path from "path";
import maxmind from 'maxmind'
import { ApiRequest, GenericError } from "../../../..";

let lookup: Reader<CityResponse> | null;
export async function getLocation(ip: string, req: ApiRequest<unknown, any>) {
    if (req.headers['x-vercel-ip-country']) {
        const country = req.headers['x-vercel-ip-country'] as string;
        const region = req.headers['x-vercel-ip-country-region'] as string;
        const city = req.headers['x-vercel-ip-city'] as string;
        return {
            country,
            region,
            city: city ? decodeURIComponent(city) : null,
        };
    }
    // Database lookup
    if (!lookup) {
        try {
            const dir = path.join(process.cwd(), 'geo');
            lookup = await maxmind.open(path.resolve(dir, 'GeoLite2-City.mmdb'));
        } catch {
            throw new GenericError("Couldn't find maxmind db", { code: 400 })
        }
    }
    const result = lookup.get(ip);
    if (result) {
        return {
            country: result.country?.iso_code ?? result?.registered_country?.iso_code ?? null,
            city: result.city?.names?.en || result.location?.time_zone?.split('/')[1] || null,
            region: null
        };
    } else {
        throw new GenericError("Couldn't find location", { code: 400 })
    }
}