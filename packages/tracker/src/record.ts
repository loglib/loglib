/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { clickHandler } from "./handlers/clickHandler";
import { send } from "./server";
import { Config } from "./types";
import {
	flush,
	getUrlParams,
} from "./utils";
import { guid } from "./utils/common";
import { logger } from "./utils/logger";
import { detectEnvironment, handlePush, hook } from "./utils/record.utils";

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
		autoTrack: true,
		env: "auto",
		postInterval: 5,
		host: process.env.VERCEL_URL || process.env.LOGLIB_HOST || "http://localhost:3000/api",
		consent: "denied"
	};
	window.llc = config ? { ...defaultConfig, ...config } : defaultConfig;
	//Get Sdk Version
	const version = require("../package.json").version;
	//Set Internal
	const now = Date.now();
	window.lli = {
		eventsBank: [],
		startTime: now,
		reload: false,
		currentUrl: `${location.pathname}${location.search}`,
		currentRef: document.referrer,
		timeOnPage: now,
		sdkVersion: version,
		sessionId: guid(),
		pageId: guid(),
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
	history.pushState = hook(history, "pushState", handlePush);
	history.replaceState = hook(history, "replaceState", handlePush);
	const InitInfo = initSession();
	send(InitInfo, "/session");
	pageViewEndHandler();
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

const pageViewEndHandler = () => {
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
		}, "/session/end", flush)

	});
};
