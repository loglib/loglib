import { useEffect } from "react";
import { record } from "../record";
import { Config, Internal } from "../types";
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
export default LogLib;