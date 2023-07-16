import { getVisitorId, isDevelopment } from "./utils/util";
import { logger } from "./utils/logger";

export async function send(
  data: Record<string, any> | Array<Record<string, any>>,
  path: string,
  onSuccess?: () => void,
  onError?: () => void,
) {
  const url = window.llc.host;
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
    visitorId: getVisitorId(),
    pageId: window.lli.pageId,
    websiteId: window.llc.id,
    host: location.hostname,
    sdkVersion: window.lli.sdkVersion,
  };
  logger.log("sending...", dataToSend);
  let retryCount = 0;
  const maxRetries = 3;
  async function sendRequest(host: string) {
    try {
      if (window.llc.useFetch) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        await fetch(host, {
          body: JSON.stringify(dataToSend),
          method: "POST",
          keepalive: true,
          headers: {
            "Content-Type": "application/json",
          },
        }).then(() => onSuccess?.());
      } else {
        navigator.sendBeacon(host, JSON.stringify(dataToSend));
        onSuccess?.();
      }
    } catch {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", host);
      xhr.setRequestHeader("Content-Type", "text/plain");
      xhr.onload = async () => {
        if (xhr.status === 200) {
          onSuccess?.();
        } else {
          await retry();
        }
        logger.error(xhr.statusText);
      };
      xhr.onerror = async () => {
        onError?.();
        await retry();
        logger.critical(
          "Couldn't send request to the server. See the XHR error.",
        );
      };
      xhr.send(JSON.stringify(dataToSend));
    }
  }
  async function retry() {
    if (retryCount < maxRetries) {
      retryCount++;
      logger.log(`Retrying request. Attempt ${retryCount} of ${maxRetries}...`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
    } else {
      logger.error("Request failed after multiple retries.");
    }
  }
  if (Array.isArray(url)) {
    for (const host of url) {
      await sendRequest(host);
    }
  } else {
    await sendRequest(url);
  }
}
