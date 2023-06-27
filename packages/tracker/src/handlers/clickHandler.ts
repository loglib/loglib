import { checkDoNotTrackClass, guid, q } from "../utils/util";


export const clickHandler = (e: Event) => {
	const target = e.target as HTMLButtonElement;
	const payload: Record<string, string> = {};
	if (checkDoNotTrackClass(e)) return;
	if (!window.llc.autoTrack) return;
	if (typeof target.onclick !== "function" && target.nodeName !== "BUTTON") {
		return;
	}
	q({
		id: guid(),
		eventName: target.textContent?.replace(/[\W_]+/g, "") ?? "",
		eventType: "click",
		page: location.pathname,
		payload,
	});
};
