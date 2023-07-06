import { record } from "./record";
import { identify, setConsent, track } from "./methods";

const loglib = {
  record: record,
  track: track,
  identify: identify,
  setConsent,
};

export { loglib, identify, setConsent, track };
