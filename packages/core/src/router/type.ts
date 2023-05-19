import { ApiRequest, LogLibOptions } from "..";



//Route Handlers
export type ApiPostHandler<T> = (req: ApiRequest<T>, options: LogLibOptions) => Promise<{ message: string, code: number, data?: any }>;
export type ApiGetHandler<T> = (req: ApiRequest<T>, options: LogLibOptions) => Promise<{ message: string, code: number, data?: any }>
export type ApiPutHandler<T> = (req: ApiRequest<T>, options: LogLibOptions) => Promise<{ message: string, code: number, data?: any }>
export type ApiDeleteHandler<T> = (req: ApiRequest<T>, options: LogLibOptions) => Promise<{ message: string, code: number, data?: any }>



/**
 * @throws GenericError
 * @returns {Promise<S>}
 */
export type Route = {
    POST?: ApiPostHandler<any>,
    GET?: ApiGetHandler<any>
    PUT?: ApiPutHandler<any>,
    DELETE?: ApiDeleteHandler<any>
}

export type Router = {
    [path: string]: Route
};