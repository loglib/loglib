import { send } from "./server";
import { getUserId } from "./utils";

export const identify = (payload: Record<string, string>) => {
	send(payload, "/user");
};

export const setConsent = (concent: "granted" | "denied") => {
	window.llc.consent = concent
	const id = getUserId()
	//make sure to send new userId to the server
	send({ id, data: {} }, "/user")
}