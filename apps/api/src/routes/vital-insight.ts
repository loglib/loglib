import { VitalDateWithSession } from "@loglib/types/tracker";

export const getVitalInsight = (
    events: VitalDateWithSession[],
    pastEvents: VitalDateWithSession[],
) => {
    const data: {
        [key in "LCP" | "CLS" | "INP" | "FID" | "TTFB" | "FCP"]: {
            current: number;
            change: number;
            length: number;
        };
    } = {
        LCP: { current: 0, change: 0, length: 0 },
        CLS: { current: 0, change: 0, length: 0 },
        INP: { current: 0, change: 0, length: 0 },
        FID: { current: 0, change: 0, length: 0 },
        TTFB: { current: 0, change: 0, length: 0 },
        FCP: { current: 0, change: 0, length: 0 },
    };
    const pastData: {
        [key in "LCP" | "CLS" | "INP" | "FID" | "TTFB" | "FCP"]: {
            current: number;
            length: number;
        };
    } = {
        LCP: { current: 0, length: 0 },
        CLS: { current: 0, length: 0 },
        INP: { current: 0, length: 0 },
        FID: { current: 0, length: 0 },
        TTFB: { current: 0, length: 0 },
        FCP: { current: 0, length: 0 },
    };
    const length = Math.max(events.length, pastEvents.length);
    for (let i = 0; i < length; i++) {
        const event = events[i];
        const pastEvent = pastEvents[i];
        if (event) {
            const stat = event.name as keyof typeof data;
            data[stat].current = data[stat].current + event.delta;
            data[stat].length = data[stat].length + 1;
        }
        if (pastEvent) {
            const stat = event.name as keyof typeof data;
            pastData[stat].current = pastData[stat].current + event.delta;
            pastData[stat].length = pastData[stat].length + 1;
        }
    }

    for (const key of Object.keys(data)) {
        data[key].current = events.length ? data[key].current / data[key].length : 0;
        pastData[key].current = pastEvents.length
            ? pastData[key].current / pastData[key].length
            : 0;
        data[key].change =
            data[key].current === 0
                ? 0
                : pastData[key].current !== 0
                ? (data[key].current / pastData[key].current) * 100
                : 100;
    }
    return data;
};
