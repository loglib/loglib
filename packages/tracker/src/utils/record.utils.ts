/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prefer-spread */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { send } from "../server";
import { flush, getUrlParams } from ".";
import { guid } from "./common";

export const getPath = (url: string) => {
	if (url.substring(0, 4) === "http") {
		return `/${url.split("/").splice(3).join("/")}`;
	}
	return url;
};

export const hook = (
	_this: History,
	method: keyof History,
	callback: (...args: never) => void,
) => {
	const orig = _this[method];

	return (...args: string[]) => {
		callback.apply(null, args);
		return orig.apply(_this, args);
	};
};

export function detectEnvironment() {
	try {
		const env = process.env.NODE_ENV;
		if (env === "development" || env === "test") {
			return "dev";
		}
	} catch (e) { }
	return "prod";
}

export const handlePush = (state: string, title: string, url: string) => {
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
			"/pageview",
			flush,
		);
		window.lli.pageId = guid()
		window.lli.timeOnPage = Date.now();
	}
};


