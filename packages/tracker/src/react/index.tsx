import { useEffect } from "react";
import { record } from "../record";
import { Config } from "../types";

interface Props {
	config?: Partial<Config>;
}



function LogLib({ config }: Props) {
	useEffect(() => {
		record(config);
	}, []);
	return null;
}
export default LogLib;