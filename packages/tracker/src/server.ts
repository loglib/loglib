import { getVisitorId, isDevelopment } from "./utils/util";
import { logger } from "./utils/logger";

export async function send(
  data: Record<string, any> | Array<Record<string, any>>,
  path: string,
  onSuccess?: () => void,
  _?: () => void,
) {
  const host = window.llc.host;
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
  };
  logger.log("sending...", dataToSend);
  let retryCount = 0;
  const maxRetries = 3;
  async function sendRequest() {
    try {
      await fetch(host, {
        body: JSON.stringify(dataToSend),
        method: "POST",
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => onSuccess?.());
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
        navigator.sendBeacon(host, JSON.stringify(dataToSend));
        onSuccess?.();
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
  await sendRequest();
}
