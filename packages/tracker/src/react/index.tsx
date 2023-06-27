import { useEffect } from "react";
import { loglib } from "../lib";
import { Config } from "../types";

interface Props {
	config?: Partial<Config>;
}

function LogLib({ config }: Props) {
	useEffect(() => {
		loglib.record(config);
	}, []);
	return null;
}
export default LogLib;
