import { identify, setConsent } from "./identify";
import { record } from "./record";
import { track } from "./track";

export const logLib = {
	record: record,
	track: track,
	identify: identify,
	setConsent
};
