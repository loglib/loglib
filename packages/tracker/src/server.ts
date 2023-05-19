/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/ban-types */
import { ServerEvents } from "./types";
import { flush, getUserId } from "./utils";
import { isDevelopment } from "./utils/common";
import { logger } from "./utils/logger";

//queue event for sending
export function q(e: ServerEvents) {
	const config = window.llc;
	window.lli.eventsBank.push(e);
	setInterval(async () => {
		if (window.lli.eventsBank.length === 0) {
			return;
		}
		send(window.lli.eventsBank, "/event", flush);
	}, config.postInterval * 1000);
}

//send events to the host
export function send(
	data: Record<string, any> | Array<Record<string, any>>,
	path: string,
	onSuccess?: Function,
	onError?: Function,
) {
	const host = window.llc.host;
	const url = `${host}/loglib`
	if (!data) {
		logger.log("skipping empty request...");
		return;
	}
	if (isDevelopment()) {
		logger.log("skipping development logs...");
		return;
	}
	//Add Session Id with every request
	const dataToSend = {
		data,
		path,
		sessionId: window.lli.sessionId,
		userId: getUserId(),
		pageId: window.lli.pageId
	};
	logger.log("sending...", dataToSend);
	let retryCount = 0;
	const maxRetries = 3;
	function sendRequest() {
		try {
			navigator.sendBeacon(url, JSON.stringify(dataToSend));
			flush();
			onSuccess?.();
		} catch {
			const xhr = new XMLHttpRequest();
			xhr.open("POST", url);
			xhr.setRequestHeader("Content-Type", "text/plain");
			xhr.onload = () => {
				if (xhr.status === 200) {
					onSuccess?.();
				} else {
					retry();
				}
				logger.error(xhr.statusText);
			};
			xhr.onerror = () => {
				onError?.();
				retry();
				logger.critical(
					"Couldn't send request to the server. See the XHR error.",
				);
			};
			xhr.send(JSON.stringify(dataToSend));
		}
	}
	function retry() {
		if (retryCount < maxRetries) {
			retryCount++;
			logger.log(`Retrying request. Attempt ${retryCount} of ${maxRetries}...`);
			setTimeout(sendRequest, 1000 * retryCount);
		} else {
			logger.error("Request failed after multiple retries.");
		}
	}
	sendRequest();
}
