import { ReferrerName } from "../lib/constants";
import { getTimeRange } from "../lib/time-helper";
import { LoglibEvent } from "../type";

export const getTablesData = (
    events: LoglibEvent[],
    startDate: Date,
    endDate: Date,
    timeZone: string,
) => {
    const data = transformData(events);
    const graph = getVisitorsByDate(events, startDate, endDate, timeZone);
    return {
        data,
        graph,
    };
};

export type TableData = ReturnType<typeof transformData>;

const transformData = (events: LoglibEvent[]) => {
    const hits = events;
    const pageViews: { page: string; visits: number }[] = [];
    const device: { device: string; visits: number }[] = [];
    const byCountry: { location: string; country: string; visits: number }[] = [];
    const byCity: { location: string; country: string; visits: number }[] = [];
    const referrer: { referrer: string; referrerDomain: string; visits: number }[] = [];
    const browsers: { browser: string; visits: number }[] = [];
    const os: { os: string; visits: number }[] = [];
    const onlineVisitors = new Set<string>();
    const utmSources: { utmSource: string; visits: number }[] = [];
    const utmCampaigns: { utmCampaign: string; visits: number }[] = [];
    const uniqueVisitorsSet = new Set();
    const uniqueSessionsSet = new Set();
    for (let i = 0; i < hits.length; i++) {
        const timestamp = new Date(hits[i].timestamp);
        const event = hits[i];
        const page = event.currentPath.split("?")[0];
        const pageIndex = pageViews.findIndex((a) => a.page === page);
        const deviceIndex = device.findIndex((a) => a.device === event.device);
        const city = event.city;
        const country = event.country;
        const cityIndex = byCity.findIndex((a) => a.location === city);
        const countryIndex = byCountry.findIndex((a) => a.location === country);
        const refDomain = event.referrerDomain;
        const refIndex = referrer.findIndex((a) => a.referrer === transformRef(refDomain));
        const browserIndex = browsers.findIndex((a) => a.browser === event.browser);
        const osIndex = os.findIndex((a) => a.os === event.os);
        const queryParams = JSON.parse(event.queryParams);
        const utmSource = queryParams.utm_source;
        const utmCampaign = queryParams.utm_campaign;
        const utmSourceIndex = utmSources.findIndex((a) => utmSource === a.utmSource);
        const utmCampaignIndex = utmCampaigns.findIndex((c) => utmCampaign === c.utmCampaign);
        const isUniqueUser = !uniqueVisitorsSet.has(event.visitorId);
        const isUniqueSession = !uniqueSessionsSet.has(event.sessionId);
        if (Date.now() - timestamp.getTime() < 1000 * 60) {
            onlineVisitors.add(event.visitorId);
        }
        if (pageIndex === -1) {
            page && page.startsWith("/") &&
                pageViews.push({
                    page,
                    visits: 1,
                });
        } else {
            pageViews[pageIndex].visits++;
        }
        if (deviceIndex === -1) {
            device.push({
                device: event.device,
                visits: 1,
            });
        } else {
            isUniqueUser && device[deviceIndex].visits++;
        }

        if (countryIndex === -1) {
            byCountry.push({
                location: country,
                country,
                visits: 1,
            });
        } else {
            isUniqueUser && byCountry[countryIndex].visits++;
        }

        if (cityIndex === -1) {
            byCity.push({
                location: city,
                country,
                visits: 1,
            });
        } else {
            isUniqueUser && byCity[cityIndex].visits++;
        }

        if (refIndex === -1) {
            refDomain &&
                referrer.push({
                    referrer: transformRef(refDomain),
                    referrerDomain: refDomain,
                    visits: 1,
                });
        } else {
            isUniqueUser && referrer[refIndex].visits++;
        }
        if (browserIndex === -1) {
            browsers.push({
                browser: event.browser,
                visits: 1,
            });
        } else {
            if (!uniqueVisitorsSet.has(event.visitorId)) {
                isUniqueSession && browsers[browserIndex].visits++;
            }
        }
        if (osIndex === -1) {
            os.push({
                os: event.os,
                visits: 1,
            });
        } else {
            isUniqueUser && os[osIndex].visits++;
        }
        if (utmSourceIndex === -1) {
            utmSource &&
                utmSources.push({
                    utmSource,
                    visits: 1,
                });
        } else {
            isUniqueSession && utmSources[utmSourceIndex].visits++;
        }
        if (utmCampaignIndex === -1) {
            utmCampaign &&
                utmCampaigns.push({
                    utmCampaign,
                    visits: 1,
                });
        } else {
            isUniqueSession && utmCampaigns[utmCampaignIndex].visits++;
        }

        uniqueVisitorsSet.add(event.visitorId);
        uniqueSessionsSet.add(event.sessionId);
    }
    const pageVisitsSorted = pageViews.sort((a, b) => b.visits - a.visits);
    const deviceSorted = device.sort((a, b) => b.visits - a.visits);
    const citySorted = byCity.sort((a, b) => b.visits - a.visits);
    const countrySorted = byCountry.sort((a, b) => b.visits - a.visits);
    const refSorted = referrer.sort((a, b) => b.visits - a.visits);
    const browserSorted = browsers.sort((a, b) => b.visits - a.visits);
    const osSorted = os.sort((a, b) => b.visits - a.visits);
    const utmSourceSorted = utmSources.sort((a, b) => b.visits - a.visits);
    const utmCampaignSorted = utmCampaigns.sort((a, b) => b.visits - a.visits);
    return {
        pages: pageVisitsSorted,
        devices: deviceSorted,
        locations: {
            city: citySorted,
            country: countrySorted,
        },
        referrer: refSorted,
        browser: browserSorted,
        os: osSorted,
        onlineVisitors: onlineVisitors.size,
        utmSources: utmSourceSorted,
        utmCampaigns: utmCampaignSorted,
    };
};

function getSiteName(url: string): string {
    try {
        const parsedUrl = new URL(url);
        const subDomain = parsedUrl.hostname.replace("www.", "");
        if (subDomain.includes(".")) {
            const splitted = subDomain.split(".");
            const domainWithoutLtd = splitted.slice(0, splitted.length - 1);
            return domainWithoutLtd[0];
        }
        return subDomain;
    } catch {
        return url.split("/").length > 1 ? url : url.charAt(0).toUpperCase() + url.slice(1);
    }
}

const transformRef = (ref: string) => {
    if (ref === "direct") {
        return ref;
    }
    let shortRef = getSiteName(ref);
    if (ReferrerName[shortRef]) {
        shortRef = ReferrerName[shortRef];
    }
    const url = ref.startsWith("https") ? new URL(ref).hostname : ref.replace("android-app://", "");
    if (ReferrerName[url]) {
        shortRef = ReferrerName[url];
    }
    return shortRef;
};

export const getVisitorsByDate = (
    events: LoglibEvent[],
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

    const uniqueSessionByDate: { originalDate: Date; date: string; visits: number }[] = [];
    const uniqueVisitorsByDate: { originalDate: Date; date: string; visits: number }[] = [];
    const uniqueVisitorsSet = new Set<string>();
    const uniqueSessionsSet = new Set<string>();
    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const date = new Date(`${event.timestamp.replace(" ", "T")}Z`).toLocaleString(
            "default",
            formatOptions,
        );

        if (!uniqueSessionsSet.has(event.sessionId)) {
            uniqueSessionsSet.add(event.sessionId);
            const index = uniqueSessionByDate.findIndex((f) => f.date === date);
            if (index !== -1) {
                uniqueSessionByDate[index].visits++;
            } else {
                uniqueSessionByDate.push({
                    date,
                    visits: 1,
                    originalDate: new Date(event.timestamp),
                });
            }
        }

        if (!uniqueVisitorsSet.has(event.visitorId)) {
            uniqueVisitorsSet.add(event.visitorId);
            const index2 = uniqueVisitorsByDate.findIndex((f) => f.date === date);
            if (index2 !== -1) {
                uniqueVisitorsByDate[index2].visits++;
            } else {
                uniqueVisitorsByDate.push({
                    date,
                    visits: 1,
                    originalDate: new Date(event.timestamp),
                });
            }
        }
    }
    return {
        uniqueSessionByDate: uniqueSessionByDate.sort(
            (a, b) => a.originalDate.getTime() - b.originalDate.getTime(),
        ),
        uniqueVisitorsByDate: uniqueVisitorsByDate.sort(
            (a, b) => a.originalDate.getTime() - b.originalDate.getTime(),
        ),
    };
};
