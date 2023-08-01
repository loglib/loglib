import { ApiRequest } from "../../../..";

export async function getLocation(_: string, req: ApiRequest<unknown, any>) {
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
  if (req.headers["cf-ipcountry"]) {
    const country = req.headers["cf-ipcountry"] as string;
    const region = req.headers["cf-ipcountry"] as string;
    const city = req.headers["cf-ipcity"] as string;
    return {
      country,
      region,
      city: city ? decodeURIComponent(city) : null,
    };
  }
  return {
    country: "",
    city: "",
  };
}
