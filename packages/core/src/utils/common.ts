import { LogLibOptions } from "..";

export const isUndefined = function (obj: any): obj is undefined {
    return obj === void 0;
};

export const isProduction = function (options: LogLibOptions) {
    return process.env.NODE_ENV === 'production' && options.environment !== "test";
}