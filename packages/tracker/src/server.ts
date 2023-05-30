import { getUserId, isDevelopment } from "./utils/util";
import { logger } from "./utils/logger";

export function send(
	data: Record<string, any> | Array<Record<string, any>>,
	path: string,
	onSuccess?: () => void,
	onError?: () => void,
) {
	const host = window.llc.host;
	const url = `${host}/api/loglib`
	if (!data || (Array.isArray(data) && data.length === 0)) {
		logger.log("skipping empty request...");
		return;
	}
	if (isDevelopment()) {
		logger.log("skipping development logs...");
		return;
	}
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