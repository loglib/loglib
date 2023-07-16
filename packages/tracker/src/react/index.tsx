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

/**
 * Initializes the web analytics tracker with the specified configuration options.
 * @param {Partial<Config>} [config] - The configuration options for the tracker. See {@link Config} for overview
 * @see [Documentation](https://loglib.io/docs) for details.
 */
function LogLib({ config }: Props) {
  useEffect(() => {
    record(config);
  }, []);
  return null;
}
export default LogLib;
