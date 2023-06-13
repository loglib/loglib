/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { clickHandler } from "./handlers/clickHandler";
import { send } from "./server";
import { Config } from "./types";
import { addInterval, clearIntervals, detectEnvironment, flush, getPath, getSessionDuration, getUrl, getUrlParams, guid, hook } from "./utils/util";
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
		intervals: []
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
		send(window.lli.eventsBank, "/event", flush)
	}, window.llc.postInterval * 1000);
	addInterval(eventsInterval);

	history.pushState = hook(history, "pushState", navigationHandler);
	history.replaceState = hook(history, "replaceState", navigationHandler);

	const InitInfo = initSession();
	send(InitInfo, "/session");
	blurHandler()
	sessionEndHandler()
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



const navigationHandler = (_: string, __: string, url: string) => {
	if (!url) return;
	const currentRef = window.lli.currentRef;
	const currentUrl = window.lli.currentUrl;
	window.lli.currentRef = window.lli.currentUrl;
	window.lli.currentUrl = getPath(url.toString());
	if (currentUrl !== currentRef) {
		send(
			{
				currentRef,
				currentUrl,
				duration: (Date.now() - window.lli.timeOnPage) / 1000,
				queryParams: getUrlParams(),
			},
			"/pageview"
		);
		window.lli.eventsBank.length &&
			send(
				window.lli.eventsBank,
				"/event",
				flush
			);
		window.lli.pageId = guid()
		window.lli.timeOnPage = Date.now();
		send({
			currentUrl: window.lli.currentUrl,
			currentRef: window.lli.currentRef,
			queryParams: getUrlParams(),
			duration: 0
		}, "/pageview")
	}
};

const sessionEndHandler = () => {
	document.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "hidden") {
			send(
				{
					duration: (Date.now() - window.lli.timeOnPage) / 1000,
					currentUrl: window.lli.currentUrl,
					currentRef: window.lli.currentRef,
					queryParams: getUrlParams(),
				},
				"/pageview",
			);
			window.lli.eventsBank.length &&
				send(
					window.lli.eventsBank,
					"/event",
					flush
				);
			send({
				duration: getSessionDuration(),
			}, "/session/pulse", flush)
			clearIntervals()
		} else {
			window.lli.timeOnPage = Date.now();
			window.lli.intervals.forEach(interval => {
				addInterval(interval)
			})
		}
	});
};

const blurHandler = () => {
	window.addEventListener("blur", () => {
		send(
			{
				duration: (Date.now() - window.lli.timeOnPage) / 1000,
				currentUrl: window.lli.currentUrl,
				currentRef: window.lli.currentRef,
				queryParams: getUrlParams(),
			},
			"/pageview",
		);
		window.lli.eventsBank.length &&
			send(
				window.lli.eventsBank,
				"/event",
				flush
			);
		send({
			duration: getSessionDuration(),
		}, "/session/pulse", flush)
	}
	);
}

export const isDarkMode = () => {
	return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches || localStorage.getItem("darkMode") === "true";
}