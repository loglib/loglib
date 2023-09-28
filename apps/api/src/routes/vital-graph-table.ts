import { VitalDateWithSession } from "@loglib/types/tracker";
import { getTimeRange } from "../lib/time-helper";

export const getVitalsData = (
    events: VitalDateWithSession[],
    startDate: Date,
    endDate: Date,
    timezone: string,
) => {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const range = getTimeRange(startDate, endDate);

    const formatOptions: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
    };

    if (range / ONE_DAY <= 2) {
        formatOptions.hour = "numeric";
    } else if (range / ONE_DAY <= 364) {
        formatOptions.day = "numeric";
        formatOptions.month = "short";
    } else {
        formatOptions.month = "short";
    }
    const dataByDate: {
        mobile: { [key in string]: { originalDate: Date; date: string; value: number }[] };
        desktop: { [key in string]: { originalDate: Date; date: string; value: number }[] };
    } = { mobile: {}, desktop: {} };
    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const date = new Date(`${event.timestamp.toString().replace(" ", "T")}Z`).toLocaleString(
            "default",
            formatOptions,
        );
        const key = event.device === "mobile" ? "mobile" : "desktop";
        const metric = event.name;
        const data = dataByDate[key][metric];
        if (!data) {
            dataByDate[key][metric] = [
                {
                    date,
                    value: event.delta,
                    originalDate: new Date(event.timestamp),
                },
            ];
            continue;
        }
        const index = data.findIndex((f) => f.date === date);
        if (index !== -1) {
            data[index].value += event.delta;
        } else {
            dataByDate[key][metric].push({
                date,
                value: event.delta,
                originalDate: new Date(event.timestamp),
            });
        }
    }
    return {
        dataByDate,
        data: getTransformedData(events),
    };
};

const getTransformedData = (vitals: VitalDateWithSession[]) => {
    let pages = [];
    let browsers = [];
    let byCity = [];
    let byCountry = [];
    let devices = [];
    let os = [];
    for (const vital of vitals) {
        toStack(vital, "currentPath", pages, "page");
        toStack(vital, "browser", browsers);
        toStack(vital, "city", byCity, "location", { country: vital.country });
        toStack(vital, "country", byCountry, "location", { country: vital.country });
        toStack(vital, "device", devices);
        toStack(vital, "os", os);
    }
    pages = getAverage(pages);
    browsers = getAverage(browsers);
    byCity = getAverage(byCity);
    devices = getAverage(devices);
    byCountry = getAverage(byCountry);
    os = getAverage(os);
    return {
        pages,
        browsers,
        locations: { byCity, byCountry },
        devices,
        byCountry,
        os: os ?? [],
    };
};

const statType = {
    INP: { sum: 0, length: 0 },
    CLS: { sum: 0, length: 0 },
    LCP: { sum: 0, length: 0 },
    FCP: { sum: 0, length: 0 },
    FID: { sum: 0, length: 0 },
    TTFB: { sum: 0, length: 0 },
};

function toStack(
    record: VitalDateWithSession,
    key: keyof VitalDateWithSession,
    array: any[],
    replaceKey?: string,
    additionalKV?: Record<string, string>,
) {
    const stat = record.name;
    const delta = record.delta;
    const value = record[key];
    const index = array.findIndex((arr) => arr[replaceKey ?? key] === value);
    if (index !== -1) {
        const copy = array[index];
        const currentStatValue = copy.data[stat];
        copy.data[stat] = {
            sum: currentStatValue.sum + delta,
            length: currentStatValue.length + 1,
        };
        array[index] = copy;
    } else {
        const initialData = {
            [replaceKey ?? key]: value,
            data: {
                ...statType,
            },
            ...additionalKV,
        };
        initialData.data[stat] = { sum: delta, length: 1 };
        array.push(initialData);
    }
}

function getAverage(arr: any[]) {
    return arr.map((rec) => {
        const data = rec.data;
        const value = {};
        Object.keys(data).forEach((key) => {
            const res = data[key].sum / data[key].length;
            value[key] = isNaN(res) ? 0 : res;
        });
        return { ...rec, data: value };
    });
}
