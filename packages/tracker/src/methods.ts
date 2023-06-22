import { send } from "./server";
import { getVisitorId, guid, q } from "./utils/util";

export const track = (name: string, payload: Record<string, any> = {}) => {
	const event = {
		id: guid(),
		eventName: name,
		eventType: "manual",
		payload,
		page: window.location.pathname,
	};
	q(event);
};

export const identify = (payload: Record<string, string>) => {
	window.llc.consent === "granted" &&
		send(payload, "/visitor");
};

export const setConsent = (concent: "granted" | "denied") => {
	window.llc.consent = concent
	const id = getVisitorId()
	send({ id, data: {} }, "/visitor")
}