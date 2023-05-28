import { record } from "./record";
import { identify, setConsent, track } from "./methods";

export const logLib = {
	record: record,
	track: track,
	identify: identify,
	setConsent
};