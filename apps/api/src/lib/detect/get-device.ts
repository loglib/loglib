import {
    DESKTOP_OS,
    DESKTOP_SCREEN_WIDTH,
    LAPTOP_SCREEN_WIDTH,
    MOBILE_OS,
    MOBILE_SCREEN_WIDTH,
} from "./constants";
import { OperatingSystem } from "detect-browser";

export function getDevice(screenWidth: number, os: OperatingSystem) {
    if (!screenWidth) return null;

    if (DESKTOP_OS.includes(os)) {
        if (os === "Chrome OS" || screenWidth < DESKTOP_SCREEN_WIDTH) {
            return "laptop";
        }
        return "desktop";
    } else if (MOBILE_OS.includes(os)) {
        if (os === "Amazon OS" || screenWidth > MOBILE_SCREEN_WIDTH) {
            return "tablet";
        }
        return "mobile";
    }

    if (screenWidth >= DESKTOP_SCREEN_WIDTH) {
        return "desktop";
    } else if (screenWidth >= LAPTOP_SCREEN_WIDTH) {
        return "laptop";
    } else if (screenWidth >= MOBILE_SCREEN_WIDTH) {
        return "tablet";
    } else {
        return "mobile";
    }
}
