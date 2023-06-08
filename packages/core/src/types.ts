import { Adapter } from "."

export type LogLibOptions = {
    adapter: Adapter,
    getLocation?: (ip: string) => Promise<{ city: string | null, country: string | null }>,
    disableLocation?: boolean,
    apiKey?: string,
    environment?: "development" | "production" | "test",
    auth?: {
        secret: string,
        expiresIn?: string | number
    },
    cors?: {
        origin: string
    }
}

export interface ApiRequest<T, S> {
    body: T
    headers: { [key: string]: any }
    method?: string
    query?: S
    cookies?: { [key: string]: any }
}