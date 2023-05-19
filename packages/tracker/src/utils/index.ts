import { DomEvent } from "../types";
import { guid } from "./common";


//User
export function getUserId() {
	if (window.llc.consent === "denied") {
		return ""
	} else {
		const getId = () => localStorage.getItem("loglib-id");
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

//If  doNotTrack class is passed don't track that element
export function checkDoNotTrackClass(e: DomEvent) {
	//This just check if there is don't track class on classList
	if (
		e.target?.className.includes("doNotTrack") ||
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
