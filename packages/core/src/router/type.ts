import { ApiRequest, LogLibOptions } from "..";


export type GenericApiResponse<S> = Promise<{ message: string, code: number, data?: S }>
//Route Handlers
export type ApiPostHandler<T, S> = (req: ApiRequest<T, unknown>, options: LogLibOptions) => GenericApiResponse<S>;
export type ApiGetHandler<T, S> = (req: ApiRequest<unknown, T>, options: LogLibOptions) => Promise<{ message: string, code: number, data: S }>
export type ApiPutHandler<T> = (req: ApiRequest<T, unknown>, options: LogLibOptions) => Promise<{ message: string, code: number, data?: any }>
export type ApiDeleteHandler<T> = (req: ApiRequest<T, unknown>, options: LogLibOptions) => Promise<{ message: string, code: number, data?: any }>

/**
 * @throws GenericError
 * @returns {Promise<S>}
 */
export type Route = {
    POST?: ApiPostHandler<any, any>,
    GET?: ApiGetHandler<any, any>
    PUT?: ApiPutHandler<any>,
    DELETE?: ApiDeleteHandler<any>,
    meta?: {
        auth?: boolean
        disallowLocalhost?: boolean
    }
}

export type Router = {
    [path: string]: Route
};