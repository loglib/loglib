import {
    CLSMetricWithAttribution,
    FCPMetricWithAttribution,
    FIDMetricWithAttribution,
    INPMetricWithAttribution,
    LCPMetricWithAttribution,
    TTFBMetricWithAttribution,
    onCLS,
    onFCP,
    onFID,
    onINP,
    onLCP,
    onTTFB,
} from "web-vitals/attribution";
import { send } from "./server";
import { getUrlParams, getVisitorId } from "./utils/util";

export function recordWebVitals() {
    const queue = window.lli.vitalQueue;
    function addToQueue(
        metric:
            | CLSMetricWithAttribution
            | FIDMetricWithAttribution
            | LCPMetricWithAttribution
            | FCPMetricWithAttribution
            | INPMetricWithAttribution
            | TTFBMetricWithAttribution,
    ) {
        const data = {
            visitorId: getVisitorId(),
            sessionId: window.lli.sessionId,
            sdkVersion: window.lli.sdkVersion,
            screenWidth: window.screen.width,
            language: navigator.language,
            queryParams: getUrlParams(),
            currentPath: window.lli.currentUrl,
            id: metric.id,
            delta: metric.delta,
            value: metric.value,
            name: metric.name,
            rating: metric.rating,
            navigationType: metric.navigationType,
            websiteId: window.llc.id,
        };
        queue.add(data);
    }
    onCLS(addToQueue);
    onFCP(addToQueue);
    onFID(addToQueue);
    onINP(addToQueue);
    onTTFB(addToQueue);
    onLCP(addToQueue);
}

export function flushVitalQueue() {
    const queue = window.lli.vitalQueue;
    if (queue.size > 0) {
        send([...queue], undefined, undefined, "/vitals");
        queue.clear();
    }
}
