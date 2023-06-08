import { ApiRequest, LogLibOptions } from "..";



//Route Handlers
export type ApiPostHandler<T> = (req: ApiRequest<T, unknown>, options: LogLibOptions) => Promise<{ message: string, code: number, data?: any }> | { message: string, code: number, data?: any };
export type ApiGetHandler<T, S> = (req: ApiRequest<unknown, T>, options: LogLibOptions) => Promise<{ message: string, code: number, data: S }>
export type ApiPutHandler<T> = (req: ApiRequest<T, unknown>, options: LogLibOptions) => Promise<{ message: string, code: number, data?: any }>
export type ApiDeleteHandler<T> = (req: ApiRequest<T, unknown>, options: LogLibOptions) => Promise<{ message: string, code: number, data?: any }>



/**
 * @throws GenericError
 * @returns {Promise<S>}
 */
export type Route = {
    POST?: ApiPostHandler<any>,
    GET?: ApiGetHandler<any, any>
    PUT?: ApiPutHandler<any>,
    DELETE?: ApiDeleteHandler<any>,
    meta?: {
        auth: boolean
    }
}

export type Router = {
    [path: string]: Route
};