import { useEffect } from "react";
import { record } from "../record";
import { Config, Internal } from "../types";
import { loglib } from "../lib";

interface Props {
  config?: Partial<Config>;
}

declare global {
  interface Window {
    llc: Config;
    lli: Internal;
    logLib: typeof loglib;
  }
}

function LogLib({ config }: Props) {
  useEffect(() => {
    record(config);
  }, []);
  return null;
}
export default LogLib;
