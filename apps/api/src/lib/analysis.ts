import { Events, PageView, Session, Visitor } from "../type";
import { ReferrerName } from "./constants";
import { getTimeRange } from "./time-helper";

export const getUniqueVisitors = (sessions: Session[], pastSessions: Session[]) => {
    const startTime = performance.now();
    const uniqueValues = new Set();

    sessions.forEach((session) => {
        uniqueValues.add(session.visitorId);
    });
    const uniqueVisitor = Array.from(uniqueValues);
    const pastUniqueValues = new Set();
    pastSessions.forEach((session) => {
        pastUniqueValues.add(session.visitorId);
    });
    const pastUniqueVisitor = Array.from(pastUniqueValues);
    const change = pastUniqueVisitor.length
        ? Math.floor(
              ((uniqueVisitor.length - pastUniqueVisitor.length) / pastUniqueVisitor.length) * 100,
          )
        : 100;
    const endTime = performance.now();
    console.log(endTime - startTime, "unique visitors");
    return {
        total: uniqueVisitor.length,
        change: change > 100 ? 100 : change,
    };
};

export const getNewVisitors = (visitors: Visitor[], pastVisitors: Visitor[]) => {
    const change = pastVisitors.length
        ? Math.floor(((visitors.length - pastVisitors.length) / pastVisitors.length) * 100)
        : 100;
    return {
        total: visitors.length,
        change: change > 100 ? 100 : change,
    };
};

export const getPageViews = (pageViews: PageView[], pastPageViews: PageView[]) => {
    const change = pastPageViews.length
        ? Math.floor(((pageViews.length - pastPageViews.length) / pastPageViews.length) * 100)
        : 100;
    return {
        total: pageViews.length,
        change: change > 100 ? 100 : change,
    };
};

//it uses pageview duration to get more accurate result since session duration includes the hidden state duration too
export const getAverageTime = (
    sessions: Session[],
    pastSessions: Session[],
    pageViews: PageView[],
    pastPageViews: PageView[],
) => {
    const startTime = performance.now();

    // Group page views by session ID
    const pageViewsBySession = pageViews.reduce((acc, pageView) => {
        if (!acc[pageView.sessionId]) {
            acc[pageView.sessionId] = [];
        }
        acc[pageView.sessionId].push(pageView);
        return acc;
    }, {});

    const pastPageViewsBySession = pastPageViews.reduce((acc, pageView) => {
        if (!acc[pageView.sessionId]) {
            acc[pageView.sessionId] = [];
        }
        acc[pageView.sessionId].push(pageView);
        return acc;
    }, {});

    let totalDuration = 0;
    let sessionCount = 0;

    // Calculate total duration and session count
    sessions.forEach((session) => {
        const pages = pageViewsBySession[session.id] || [];
        const duration = pages.reduce((acc, pageView) => acc + pageView.totalDuration, 0);
        totalDuration += duration;
        sessionCount++;
    });

    let pastTotalDuration = 0;
    let pastSessionCount = 0;

    pastSessions.forEach((session) => {
        const pages = pastPageViewsBySession[session.id] || [];
        const duration = pages.reduce((acc, pageView) => acc + pageView.totalDuration, 0);
        pastTotalDuration += duration;
        pastSessionCount++;
    });

    const pastTotal = pastSessionCount ? pastTotalDuration : 0;
    const change = pastTotal ? Math.floor(((totalDuration - pastTotal) / pastTotal) * 100) : 100;
    const seconds = Math.floor(totalDuration / sessionCount);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const endTime = performance.now();
    console.log(endTime - startTime, "average time");

    if (seconds < 60) {
        return {
            total: isNaN(seconds) ? "0 sec" : `${seconds} sec`,
            change: change > 100 ? 100 : change,
        };
    } else {
        return {
            total: `${isNaN(minutes) ? 0 : minutes} min ${
                isNaN(remainingSeconds) ? 0 : remainingSeconds
            } sec`,
            change: change > 100 ? 100 : change,
        };
    }
};

export const getBounceRate = (
    pageViews: PageView[],
    pastPageViews: PageView[],
    sessions: Session[],
    pastSessions: Session[],
) => {
    const startTime = performance.now();

    const totalSessions = sessions.length;
    const totalPageViews = pageViews.length;

    if (totalSessions === 0 || totalPageViews === 0) {
        return {
            total: 0,
            change: 0,
        };
    }

    // Create a map of session IDs to page view counts
    const pageViewCounts = pageViews.reduce((acc, pageView) => {
        if (!acc[pageView.sessionId]) {
            acc[pageView.sessionId] = 0;
        }
        acc[pageView.sessionId]++;
        return acc;
    }, {});

    const pastPageViewCounts = pastPageViews.reduce((acc, pageView) => {
        if (!acc[pageView.sessionId]) {
            acc[pageView.sessionId] = 0;
        }
        acc[pageView.sessionId]++;
        return acc;
    }, {});

    // Count single-page view sessions
    let singlePageViewSessions = 0;
    let pastSinglePageViewSessions = 0;

    sessions.forEach((session) => {
        if (pageViewCounts[session.id] === 1) {
            singlePageViewSessions++;
        }
    });

    pastSessions.forEach((session) => {
        if (pastPageViewCounts[session.id] === 1) {
            pastSinglePageViewSessions++;
        }
    });

    const bounceRate = (singlePageViewSessions / totalSessions) * 100;
    const pastBounceRate = (pastSinglePageViewSessions / pastSessions.length) * 100;
    const change = pastBounceRate
        ? Math.floor(((bounceRate - pastBounceRate) / pastBounceRate) * 100)
        : 100;

    const endTime = performance.now();
    console.log(endTime - startTime, "bounce rate");

    return {
        total: parseFloat(bounceRate.toFixed(2)),
        change: change > 100 ? 100 : parseFloat(change.toFixed(2)),
    };
};

export const getPages = (pageViews: PageView[]) => {
    const startTime = performance.now();
    const pages = pageViews.reduce((acc, pageView) => {
        const page = pageView.page.split("?")[0];
        const isPage = acc.find((p) => p.page === page);
        if (!page) {
            return acc;
        }
        if (isPage) {
            isPage.visits++;
        } else {
            acc.push({
                page,
                visits: 1,
            });
        }
        return acc;
    }, [] as { page: string; visits: number }[]);

    const sorted = pages.sort((a, b) => b.visits - a.visits);
    const endTime = performance.now();
    console.log(endTime - startTime, "pages");
    return sorted;
};

export const getLoc = (sessions: Session[], byCountry = true) => {
    const startTime = performance.now();
    const locations = sessions.reduce((acc, session) => {
        const location = byCountry ? session.country ?? "Unknown" : session.city ?? "Unknown";
        const isFound = acc.find((p) => p.location === location);
        if (isFound) {
            isFound.visits++;
        } else {
            if (location !== "country" && location !== "city") {
                acc.push({
                    location,
                    visits: 1,
                    country: session.country ?? "Unknown",
                });
            }
        }
        return acc;
    }, [] as { location: string; visits: number; country: string }[]);

    const sorted = locations.sort((a, b) => b.visits - a.visits);
    const endTime = performance.now();
    console.log(endTime - startTime, "location");
    return sorted;
};

export const getReferer = (sessions: Session[]) => {
    const startTime = performance.now();
    function getSiteName(url: string): string {
        try {
            const parsedUrl = new URL(url);
            const subDomain = parsedUrl.hostname.split(".");
            const domain = subDomain[subDomain.length - 2];
            return domain ? domain.charAt(0).toUpperCase() + domain.slice(1) : url;
        } catch {
            return url.split("/").length > 1 ? url : url.charAt(0).toUpperCase() + url.slice(1);
        }
    }
    const referees = sessions.reduce((acc, session) => {
        const referrer =
            session.referrer === ""
                ? "Direct"
                : ReferrerName[session.referrer as keyof typeof ReferrerName] ??
                  getSiteName(session.referrer);
        const isFound = acc.find((p) => p.referrer === referrer);
        if (isFound) {
            isFound.visits++;
        } else {
            acc.push({
                referrer,
                visits: 1,
                referrerDomain: session.referrer,
            });
        }
        return acc;
    }, [] as { referrer: string; visits: number; referrerDomain: string }[]);

    const sorted = referees.sort((a, b) => b.visits - a.visits);
    const endTime = performance.now();
    console.log(endTime - startTime, "referrer");
    return sorted;
};

export const getDevices = (sessions: Session[]) => {
    const startTime = performance.now();
    const devices: { device: string; visits: number }[] = [];

    for (let i = 0; i < sessions.length; i++) {
        const session = sessions[i];
        const device = session.device || "unknown";
        let isFound = false;

        for (let j = 0; j < devices.length; j++) {
            if (devices[j].device === device) {
                devices[j].visits++;
                isFound = true;
                break;
            }
        }

        if (!isFound) {
            devices.push({
                device,
                visits: 1,
            });
        }
    }

    const endTime = performance.now();
    console.log(endTime - startTime, "devices");

    return devices.sort((a, b) => b.visits - a.visits);
};

export const getOS = (sessions: Session[]) => {
    const startTime = performance.now();
    const deviceOS: { os: string; visits: number }[] = [];

    for (let i = 0; i < sessions.length; i++) {
        const session = sessions[i];
        const os = session.os ?? "unknown";
        let isFound = false;

        for (let j = 0; j < deviceOS.length; j++) {
            if (deviceOS[j].os === os) {
                deviceOS[j].visits++;
                isFound = true;
                break;
            }
        }

        if (!isFound) {
            deviceOS.push({
                os,
                visits: 1,
            });
        }
    }

    const endTime = performance.now();
    console.log(endTime - startTime, "OS");

    return deviceOS.sort((a, b) => b.visits - a.visits);
};

export const getBrowser = (sessions: Session[]) => {
    const startTime = performance.now();
    const browsers: { browser: string; visits: number }[] = [];

    for (let i = 0; i < sessions.length; i++) {
        const session = sessions[i];
        const browser = session.browser ?? "unknown";
        let isFound = false;

        for (let j = 0; j < browsers.length; j++) {
            if (browsers[j].browser === browser) {
                browsers[j].visits++;
                isFound = true;
                break;
            }
        }

        if (!isFound) {
            browsers.push({
                browser,
                visits: 1,
            });
        }
    }

    const sorted = browsers.sort((a, b) => b.visits - a.visits);
    const endTime = performance.now();
    console.log(endTime - startTime, "browser");
    return sorted;
};

export const getVisitorsByDate = (
    sessions: Session[],
    startDate: Date,
    endDate: Date,
    timezone: string,
    uniqueVisitors = true,
) => {
    const startTime = performance.now();
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

    let sessionsToProcess = sessions;

    if (uniqueVisitors) {
        // Use Set to eliminate duplicate sessions based on visitorId
        const uniqueSessionsSet = new Set<string>();
        sessionsToProcess = sessions.filter((session) => {
            if (uniqueSessionsSet.has(session.visitorId)) {
                return false;
            }
            uniqueSessionsSet.add(session.visitorId);
            return true;
        });
    }

    // Use Map to group sessions by date
    const sessionsByDate = sessionsToProcess.reduce((accumulator, session) => {
        const date = new Date(session.createdAt).toLocaleString("default", formatOptions);
        if (!accumulator.has(date)) {
            accumulator.set(date, {
                originalDate: new Date(session.createdAt), // Convert to Date object
                date,
                visits: 0,
            });
        }
        // rome-ignore lint/style/noNonNullAssertion: <explanation>
        accumulator.get(date)!.visits++;
        return accumulator;
    }, new Map<string, { date: string; visits: number; originalDate: Date }>());

    // Convert Map values to an array
    const visitors = Array.from(sessionsByDate.values()).sort(
        (a, b) => a.originalDate.getTime() - b.originalDate.getTime(),
    );

    const endTime = performance.now();
    console.log(endTime - startTime, "visitors by date");

    return visitors;
};

export const getOnlineVisitors = (sessions: Session[]) => {
    const now = new Date();
    const onlineVisitors = sessions.filter((session) => {
        const diff = now.getTime() - new Date(session.updatedAt).getTime();
        return diff < 1000 * 30;
    });
    return onlineVisitors.length;
};

export const getEvents = (events: Events[], sessions: Session[], pages: PageView[]) => {
    const eventWithSession = events.map((event) => {
        const session = sessions.find((session) => session.id === event.sessionId);
        const page = pages.find((page) => page.id === event.pageId);
        const payload = JSON.parse(event.payload);
        return {
            ...event,
            ...session,
            page,
            payload,
        };
    });
    return eventWithSession.filter((event) => event.eventName);
};

export type EventsWithData = ReturnType<typeof getEvents>;

export const getUtmSources = (sessions: Session[]) => {
    const localSessions = sessions.filter((session) => {
        if (session.queryParams) {
            const queryParams = JSON.parse(session.queryParams);
            return queryParams.utm_source;
        }
    });
    const utmSources = localSessions.reduce((acc, session) => {
        const queryParams = JSON.parse(session.queryParams);
        const utmSource = queryParams?.utm_source ?? "unknown";
        const isFound = acc.find((p) => p.utmSource === utmSource);
        if (isFound) {
            isFound.visits++;
        } else {
            acc.push({
                utmSource,
                visits: 1,
            });
        }
        return acc;
    }, [] as { utmSource: string; visits: number }[]);
    return utmSources;
};

export const getUtmCampaigns = (sessions: Session[]) => {
    const localSessions = sessions.filter((session) => {
        if (session.queryParams) {
            const queryParams = JSON.parse(session.queryParams);
            return queryParams.utm_campaign;
        }
    });
    const utmCampaigns = localSessions.reduce((acc, session) => {
        const queryParams = JSON.parse(session.queryParams);
        const utmCampaign = queryParams?.utm_campaign;
        const isFound = acc.find((p) => p.utmCampaign === utmCampaign);
        if (isFound) {
            isFound.visits++;
        } else {
            acc.push({
                utmCampaign,
                visits: 1,
            });
        }
        return acc;
    }, [] as { utmCampaign: string; visits: number }[]);
    return utmCampaigns;
};
