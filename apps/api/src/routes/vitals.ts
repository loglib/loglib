import { VitalDateWithSession } from "@loglib/types/tracker";
import { getTimeRange } from "../lib/time-helper";

export const getVitalsByDate = (
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
    const dataByDate: { [key in string]: { originalDate: Date; date: string; value: number }[] } = {}
    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const date = new Date(`${event.timestamp.toString().replace(" ", "T")}Z`).toLocaleString(
            "default",
            formatOptions,
        );
        const metric = event.name
        const data = dataByDate[metric]
        if (!data) {
            dataByDate[metric] = [{
                date,
                value: event.delta,
                originalDate: new Date(event.timestamp),
            }]
            continue
        }
        const index = data.findIndex((f) => f.date === date);
        if (index !== -1) {
            data[index].value += event.delta;
        } else {
            dataByDate[metric].push({
                date,
                value: event.delta,
                originalDate: new Date(event.timestamp),
            })
        }
    }
    return {
        dataByDate,
        data: transformData(events)
    }
};

const transformData = (vitals: VitalDateWithSession[]) => {
    const pages: { page: string; data: { [key in string]: number } }[] = [];
    const devices: { device: string; data: { [key in string]: number } }[] = [];
    const byCountry: { location: string; country: string; data: { [key in string]: number } }[] = [];
    const byCity: { location: string; country: string; data: { [key in string]: number } }[] = [];
    const browsers: { browser: string; data: { [key in string]: number } }[] = [];
    const os: { os: string; data: { [key in string]: number } }[] = [];
    for (let i = 0; i < vitals.length; i++) {
        const vital = vitals[i];
        const name = vital.name
        const page = vital.currentPath.split("?")[0];
        const pageIndex = pages.find((a) => a.page === page);
        const device = vital.device
        const deviceIndex = devices.find(d => d.device === device)
        const country = vital.country
        const countryIndex = byCountry.find(c => c.location === country)
        const city = vital.city
        const cityIndex = byCity.find(c => c.location === city)
        const browser = vital.browser
        const browserIndex = browsers.find(b => b.browser === browser)
        const osIndex = os.find(o => o.os === vital.os)
        if (!pageIndex) {
            const data = { page, data: { [name]: vital.value } }
            page?.startsWith("/") &&
                pages.push(data);
        } else {
            if (pageIndex.data[name]) {
                pageIndex.data[name] = pageIndex.data[name] + vital.value
            } else {
                pageIndex.data[name] = vital.value
            }
        }

        if (!deviceIndex) {
            const data = { device, data: { [name]: vital.value } }
            devices.push(data)
        } else {
            if (deviceIndex.data[name]) {
                deviceIndex.data[name] = deviceIndex.data[name] + vital.value
            } else {
                deviceIndex.data[name] = vital.value
            }
        }
        if (!countryIndex) {
            byCountry.push({ location: country, country, data: { [name]: vital.value } })
        } else {
            if (countryIndex.data[name]) {
                countryIndex.data[name] = countryIndex.data[name] + vital.value
            } else {
                countryIndex.data[name] = vital.value
            }
        }

        if (!cityIndex) {
            byCity.push({ location: city, country, data: { [name]: vital.value } })
        } else {
            if (cityIndex.data[name]) {
                cityIndex.data[name] = cityIndex.data[name] + vital.value
            } else {
                cityIndex.data[name] = vital.value
            }
        }

        if (!browserIndex) {
            browsers.push({ browser, data: { [name]: vital.value } })
        } else {
            if (browserIndex.data[name]) {
                browserIndex.data[name] = browserIndex.data[name] + vital.value
            }
            else {
                browserIndex.data[name] = vital.value
            }
        }

        if (!osIndex) {
            os.push({ os: vital.os, data: { [name]: vital.value } })
        } else {
            if (osIndex.data[name]) {
                osIndex.data[name] = osIndex.data[name] + vital.value
            } else {
                osIndex.data[name] = vital.value
            }
        }

    }
    return {
        pages,
        devices,
        location: {
            byCity,
            byCountry
        },
        browsers,
        os
    }
}