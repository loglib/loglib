import { useEffect } from "react";
import { identify } from "../identify";
import { record } from "../record";
import { track } from "../track";
import { Config, Internal } from "../types";
import { setConsent } from "../identify";
import { logLib } from "../lib";

interface Props {
	config?: Partial<Config>;
}

declare global {
	interface Window {
		llc: Config;
		lli: Internal;
		logLib: typeof logLib;
	}
}

function LogLib({ config }: Props) {
	useEffect(() => {
		record(config);
	}, []);
	return null;
}
export { identify, track, setConsent };
export default LogLib;