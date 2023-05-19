import { Adapter } from "."

export type LogLibOptions = {
    adapter: Adapter,
    auth?: boolean,
    getLocation?: () => Promise<{ city: string | null, country: string | null }>,
    disableLocation?: boolean,
    apiKey?: string,
    environment?: "test" | "production" | "development"
}

export interface ApiRequest<T> {
    body: T
    headers: { [key: string]: any }
    method?: string
    query?: { [key: string]: any }
    cookies?: { [key: string]: any }
}
