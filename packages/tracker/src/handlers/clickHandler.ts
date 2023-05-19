/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { checkDoNotTrackClass } from "../utils";
import { q } from "../server";

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const clickHandler = (e: any) => {
	const payload: Record<string, string> = {};
	if (checkDoNotTrackClass(e)) return;
	if (typeof e.target.onclick !== "function" || e.target.nodeName !== "BUTTON")
		return;
	q({
		id: Date.now().toString(),
		eventName: e.target.textContent.replace(/[\W_]+/g, ""),
		eventType: "click",
		page: location.pathname,
		payload,
	});
};
