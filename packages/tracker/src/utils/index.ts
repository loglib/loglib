import { DomEvent } from "../types";
import { guid } from "./common";


//User
export function getUserId() {
	const getId = () => localStorage.getItem("loglib-id");
	if (window.llc.consent === "denied" && !getId()) {
		return ""
	} else {
		window.llc.consent = "granted";
		if (!getId()) {
			window.localStorage.setItem("loglib-id", guid());
		}
		return getId()
	}
}
//Page
export const setLastPage = () =>
	sessionStorage.setItem("lastPage", location.pathname);
export const getLastPage = () =>
	sessionStorage.getItem("lastPage") || undefined;

//Flush the Events
export function flush() {
	window.lli.eventsBank = [];
}


export function checkDoNotTrackClass(e: DomEvent) {
	if (
		e.target.hasAttribute("doNotTrack")
	) {
		return true;
	}
}

export const getUrlParams = () => {
	const urlSearchParams = new URLSearchParams(window.location.search);
	//@ts-ignore
	return Object.fromEntries(urlSearchParams.entries());
};
