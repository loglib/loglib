import { clickHandler } from "./handlers/clickHandler";
import { send } from "./server";
import { Config } from "./types";
import {
  addInterval,
  clearIntervals,
  detectEnvironment,
  flush,
  getPath,
  getSessionDuration,
  getUrl,
  getUrlParams,
  guid,
  hook,
  parseHost,
} from "./utils/util";
import { logger } from "./utils/logger";

/**
 *
 * @name record
 * @description entry point to start recording events
 * @param Config
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
  if (config && config.host) {
    config.host = parseHost(config.host);
  }
  window.llc = config ? { ...defaultConfig, ...config } : defaultConfig;

  //Set Internal
  const now = Date.now();
  window.lli = {
    eventsBank: [],
    startTime: now,
    currentUrl: `${location.pathname}${location.search}`,
    currentRef: document.referrer,
    timeOnPage: now,
    sessionId: guid(),
    pageId: guid(),
    intervals: [],
  };

  logger.log("start recording...");
  //Auto Tracker
  if (window.llc.autoTrack) {
    window.addEventListener("click", clickHandler);
  }
  if (window.llc.env === "auto") {
    const env = detectEnvironment();
    window.llc.env = env;
  }

  const eventsInterval = setInterval(() => {
    send(window.lli.eventsBank, "/event", flush);
  }, window.llc.postInterval * 1000);
  addInterval(eventsInterval);

  //Session Start
  const InitInfo = initSession();
  send(InitInfo, "/session");

  //Navigation Handler
  history.pushState = hook(history, "pushState", navigationHandler);
  history.replaceState = hook(history, "replaceState", navigationHandler);

  //Session End
  sessionEndHandler();
}

export const initSession = () => {
  window.lli.startTime = Date.now();
  const initInfo = {
    pathname: location.pathname,
    host: location.hostname,
    referrer: document.referrer,
    queryParams: getUrlParams(),
    screenWidth: window.screen.width,
    language: navigator.language,
  };
  return initInfo;
};

export const navigationHandler = (_: string, __: string, url: string) => {
  if (!url) return;
  const currentRef = window.lli.currentRef;
  const currentUrl = window.lli.currentUrl;
  window.lli.currentRef = window.lli.currentUrl;
  window.lli.currentUrl = getPath(url.toString());
  if (currentUrl !== currentRef) {
    window.lli.eventsBank.length &&
      send(window.lli.eventsBank, "/event", flush);
    window.lli.pageId = guid();
    window.lli.timeOnPage = Date.now();
    send(
      {
        currentUrl,
        currentRef,
        queryParams: getUrlParams(),
        duration: 0,
      },
      "/pageview",
    );
    send(
      {
        pageDuration: (Date.now() - window.lli.timeOnPage) / 1000,
        duration: getSessionDuration(),
      },
      "/session/pulse",
      flush,
    );
  }
};

const sessionEndHandler = () => {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      window.lli.eventsBank.length &&
        send(window.lli.eventsBank, "/event", flush);
      send(
        {
          pageDuration: (Date.now() - window.lli.timeOnPage) / 1000,
          duration: getSessionDuration(),
        },
        "/session/pulse",
        flush,
      );
      clearIntervals();
    } else {
      window.lli.timeOnPage = Date.now();
      window.lli.intervals.forEach((interval) => {
        addInterval(interval);
      });
    }
  });
};
