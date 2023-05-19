import { q } from "./server";

export const track = (name: string, payload: Record<string, any> = {}) => {
	const event = {
		id: Date.now().toString(),
		eventName: name,
		eventType: "manual",
		payload,
		page: window.location.pathname,
	};
	q(event);
};
