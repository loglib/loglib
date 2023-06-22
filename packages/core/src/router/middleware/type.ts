import { ApiRequest, LogLibOptions } from "../..";
import { ApiGetHandler, ApiPostHandler, GenericApiResponse } from "../type";



export type Middleware = (req: ApiRequest<any, any>, options: LogLibOptions, next: ApiGetHandler<any, any> | ApiPostHandler<any, any>) => GenericApiResponse<any> 