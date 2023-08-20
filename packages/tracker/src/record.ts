/* eslint-disable @typescript-eslint/no-floating-promises */
import { clickHandler } from "./handlers/clickHandler";
import { sendEvents, sendPageView } from "./server";
import { Config } from "./types";
import { Logger } from "./utils/logger";
import {
    addInterval,
    clearIntervals,
    detectEnvironment,
    getPath,
    getUrl,
    guid,
    hook,
    parseHost,
} from "./utils/util";

/**
 * Initializes the web analytics tracker with the specified configuration options.
 * @param {Partial<Config>} [config] - The configuration options for the tracker. See {@link Config} for overview
 * @see [Documentation](https://loglib.io/docs) for details.
 */
export function record(config?: Partial<Config>) {
    //Set Config
    const defaultConfig: Config = {
        debug: false,
        autoTrack: false,
        env: "auto",
        postInterval: 5,
        host: getUrl(),
        consent: "denied",
    };
    if (config?.host) {
        if (Array.isArray(config.host)) {
            config.host = config.host.map((host) => parseHost(host));
        } else {
            config.host = parseHost(config.host);
        }
    }
    window.llc = config ? { ...defaultConfig, ...config } : defaultConfig;
    //Set Internal
    const now = Date.now();
    const packageJson = require("../package.json") as { version: string };
    window.lli = {
        eventsBank: [],
        startTime: now,
        currentUrl: `${location.pathname}${location.search}`,
        currentRef: document.referrer,
        timeOnPage: now,
        sessionId: guid(),
        pageId: guid(),
        intervals: [],
        sdkVersion: packageJson.version,
    };
    const logger = Logger(window.llc.debug)
    logger.log("start recording...", window.llc);
    //Auto Tracker
    if (window.llc.autoTrack) {
        window.addEventListener("click", clickHandler);
    }
    if (window.llc.env === "auto") {
        const env = detectEnvironment();
        window.llc.env = env;
    }
    const eventsInterval = setInterval(() => {
        sendEvents()
    }, window.llc.postInterval * 1000);
    addInterval(eventsInterval);
    //Navigation Handler
    history.pushState = hook(history, "pushState", navigationHandler);
    history.replaceState = hook(history, "replaceState", navigationHandler);
    //Session End
    sessionEndHandler();
}

export const navigationHandler = (_: string, __: string, url: string) => {
    if (!url) return;
    const currentRef = window.lli.currentRef;
    const currentUrl = window.lli.currentUrl;
    window.lli.currentRef = window.lli.currentUrl;
    window.lli.currentUrl = getPath(url.toString());
    if (currentUrl !== currentRef) {
        sendPageView(currentUrl, currentRef);
        sendEvents();
        window.lli.pageId = guid();
        window.lli.timeOnPage = Date.now();
    }
};

const sessionEndHandler = async () => {
    document.onvisibilitychange = () => {
        if (document.visibilityState === "hidden") {
            sendEvents();
            const currentRef = window.lli.currentRef;
            const currentUrl = window.lli.currentUrl;
            sendPageView(currentRef, currentUrl);
            clearIntervals();
        } else {
            //there should be already a config
            if (window.llc) {
                record(window.llc);
            }
        }
    };
};
