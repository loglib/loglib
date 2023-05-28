import { q, send } from "./server";
import { getUserId, guid } from "./utils/util";

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
	send(payload, "/user");
};

export const setConsent = (concent: "granted" | "denied") => {
	window.llc.consent = concent
	const id = getUserId()
	//make sure to send new userId to the server
	send({ id, data: {} }, "/user")
}