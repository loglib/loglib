import { Adapter } from "."

export type LogLibOptions = {
    adapter: Adapter,
    getLocation?: () => Promise<{ city: string | null, country: string | null }>,
    disableLocation?: boolean,
    apiKey?: string,
    environment?: "development" | "production" | "test",
}

export interface ApiRequest<T, S> {
    body: T
    headers: { [key: string]: any }
    method?: string
    query?: S
    cookies?: { [key: string]: any }
}
