import { loglib } from "./lib";
import { Config, Internal } from "./types";

declare global {
    interface Window {
        llc: Config;
        lli: Internal;
        logLib: typeof loglib;
    }
}
// @ts-ignore
window.loglib = loglib;