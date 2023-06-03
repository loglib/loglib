/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { clickHandler } from "./handlers/clickHandler";
import { send } from "./server";
import { Config } from "./types";
import { addInterval, clearIntervals, detectEnvironment, flush, getPath, getUrl, getUrlParams, guid, hook } from "./utils/util";
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
		pulseInterval: 10,
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

	// if (window.llc.env === "prod" && !process.env.VERCEL_URL && !process.env.LOGLIB_SERVER_URL) {
	// 	throw new Error("Please provide a host url for production environment");
	// }

	const eventsInterval = setInterval(() => {
		send(window.lli.eventsBank, "/event", flush)
	}, window.llc.postInterval * 1000);
	addInterval(eventsInterval);

	history.pushState = hook(history, "pushState", navigationHandler);
	history.replaceState = hook(history, "replaceState", navigationHandler);

	const InitInfo = initSession();
	send(InitInfo, "/session");

	const pulseInterval = setInterval(() => {
		send({ duration: (Date.now() - window.lli.timeOnPage) / 1000 }, "/session/pulse")
	}, window.llc.pulseInterval * 1000);
	addInterval(pulseInterval)

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



const navigationHandler = (state: string, title: string, url: string) => {
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
		// console.log(currentUrl, window.lli.currentUrl, currentRef, window.lli.currentRef)
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
	//Register to send Page Duration
	window.addEventListener("unload", () => {
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
			duration: (Date.now() - window.lli.startTime) / 1000,
		}, "/session/pulse", flush)
		clearIntervals()
	});

	window.addEventListener("beforeunload", clearIntervals);
};