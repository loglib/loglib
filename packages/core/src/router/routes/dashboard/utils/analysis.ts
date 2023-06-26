import { PageView, Visitor, Session, Events } from "../../../../adapters/models"
import { ReferrerName } from "./constants"
import { getTimeRange } from "./timeHelper"

export const getUniqueVisitors = (visitors: Visitor[], pastVisitors: Visitor[]) => {
    const change = pastVisitors.length ? Math.floor(((visitors.length - pastVisitors.length) / pastVisitors.length) * 100) : 100
    return {
        total: visitors.length,
        change: change > 100 ? 100 : change
    }
}

export const getPageViews = (pageViews: PageView[], pastPageViews: PageView[]) => {
    const change = pastPageViews.length ? Math.floor(((pageViews.length - pastPageViews.length) / pastPageViews.length) * 100) : 100
    return {
        total: pageViews.length,
        change: change > 100 ? 100 : change
    }
}

//it uses pageview duration to get more accurate result since session duration includes the hidden state duration too
export const getAverageTime = (sessions: Session[], pastSessions: Session[], pageViews: PageView[], pastPageViews: PageView[]) => {
    const total = sessions.reduce((acc, session) => {
        const pages = pageViews.filter(pageView => pageView.sessionId === session.id);
        const duration = pages.reduce((acc, pageView) => acc + pageView.duration, 0);
        return acc + duration;
    }, 0);
    const pastTotal = pastSessions.reduce((acc, session) => {
        const pages = pastPageViews.filter(pageView => pageView.sessionId === session.id);
        const duration = pages.reduce((acc, pageView) => acc + pageView.duration, 0);
        return acc + duration;
    }, 0)
    const change = pastTotal ? Math.floor(((total - pastTotal) / pastTotal) * 100) : 100
    const seconds = Math.floor(total / sessions.length)
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (seconds < 60) {
        return {
            total: isNaN(seconds) ? '0 sec' : `${seconds} sec`,
            change: change > 100 ? 100 : change
        }
    } else {
        return {
            total: `${isNaN(minutes) ? 0 : minutes} min ${isNaN(remainingSeconds) ? 0 : remainingSeconds} sec`,
            change: change > 100 ? 100 : change
        }
    }
}

export const getBounceRate = (pageViews: PageView[], pastPageViews: PageView[], sessions: Session[], pastSessions: Session[]) => {
    const totalSessions = sessions.length;
    const totalPageViews = pageViews.length;
    if (totalSessions === 0 || totalPageViews === 0) {
        return {
            total: 0,
            change: 0
        };
    }
    const singlePageViewSessions = sessions.filter(session => {
        const sessionPageViews = pageViews.filter(pageView => pageView.sessionId === session.id);
        return sessionPageViews.length === 1;
    });
    const pastSinglePageViewSessions = pastSessions.filter(session => {
        const sessionPageViews = pastPageViews.filter(pageView => pageView.sessionId === session.id);
        return sessionPageViews.length === 1;
    });
    const bounceRate = (singlePageViewSessions.length / sessions.length) * 100;
    const pastBounceRate = (pastSinglePageViewSessions.length / pastSessions.length) * 100;
    const change = pastBounceRate ? Math.floor(((bounceRate - pastBounceRate) / pastBounceRate) * 100) : 100;
    return {
        total: parseFloat(bounceRate.toFixed(2)),
        change: change > 100 ? 100 : parseFloat(change.toFixed(2))
    };
};

export const getPages = (pageViews: PageView[]) => {
    const pages = pageViews.reduce((acc, pageView) => {
        const { page } = pageView;
        const isPage = acc.find(p => p.page === page);
        if (!page) {
            return acc;
        }
        if (isPage) {
            isPage.visits++;
        } else {
            acc.push({
                page,
                visits: 1
            });
        }
        return acc;
    }, [] as { page: string, visits: number }[]);
    return pages.sort((a, b) => b.visits - a.visits);
}

export const getLoc = (sessions: Session[], byCountry = true) => {
    const locations = sessions.reduce((acc, session) => {
        const location = byCountry ? session.country ?? "Unknown" : session.city ?? "Unknown";
        const isFound = acc.find(p => p.location === location);
        if (isFound) {
            isFound.visits++;
        } else {
            if (location !== "country" && location !== "city") {
                acc.push({
                    location,
                    visits: 1
                });
            }

        }
        return acc;
    }, [] as { location: string, visits: number }[]);
    return locations.sort((a, b) => b.visits - a.visits);
}

export const getReferer = (sessions: Session[]) => {
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
        const referrer = session.referrer === "" ? "Direct" : ReferrerName[session.referrer as keyof typeof ReferrerName] ?? getSiteName(session.referrer);
        const isFound = acc.find(p => p.referrer === referrer);
        if (isFound) {
            isFound.visits++;
        } else {
            acc.push({
                referrer,
                visits: 1,
                referrerDomain: session.referrer
            });
        }
        return acc;
    }, [] as { referrer: string, visits: number, referrerDomain: string }[]);
    return referees.sort((a, b) => b.visits - a.visits);
}

export const getDevices = (sessions: Session[]) => {
    const devices = sessions.reduce((acc, session) => {
        const device = session.device || "unknown"
        const isFound = acc.find(p => p.device === device);
        if (isFound) {
            isFound.visits++;
        } else {
            acc.push({
                device,
                visits: 1
            });
        }
        return acc;
    }, [] as { device: string, visits: number }[]);

    return devices.sort((a, b) => b.visits - a.visits);
}

export const getOS = (sessions: Session[]) => {
    const deviceOS = sessions.reduce((acc, session) => {
        const os = session.os ?? "unknown"
        const isFound = acc.find(p => p.os === os);
        if (isFound) {
            isFound.visits++;
        } else {
            acc.push({
                os,
                visits: 1
            });
        }
        return acc;
    }, [] as { os: string, visits: number }[]);
    return deviceOS.sort((a, b) => b.visits - a.visits);
}

export const getBrowser = (sessions: Session[]) => {
    const browsers = sessions.reduce((acc, session) => {
        const browser = session.browser ?? "unknown"
        const isFound = acc.find(p => p.browser === browser);
        if (isFound) {
            isFound.visits++;
        } else {
            acc.push({
                browser,
                visits: 1
            });
        }
        return acc;
    }, [] as { browser: string, visits: number }[]);
    return browsers.sort((a, b) => b.visits - a.visits);
}

export const getVisitorsByDate = (sessions: Session[], startDate: Date, endDate: Date, uniqueVisitors = true, timezone: string) => {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const range = getTimeRange(startDate, endDate);
    const uniqueVisitorsSessions = sessions.filter((session, index, self) =>
        index === self.findIndex((s) => (
            s.visitorId === session.visitorId
        ))
    );
    sessions = uniqueVisitors ? uniqueVisitorsSessions : sessions;

    const formatOptions: Intl.DateTimeFormatOptions = {
        timeZone: timezone,
    };

    if (range / ONE_DAY <= 2) {
        formatOptions.hour = 'numeric';
    } else if (range / ONE_DAY <= 364) {
        formatOptions.day = 'numeric';
        formatOptions.month = 'short';
    } else {
        formatOptions.month = 'short';
    }

    const visitors = sessions.reduce((acc, session) => {
        const date = new Date(session.createdAt).toLocaleString('default', formatOptions);
        const isFound = acc.find(p => p.date === date);
        if (isFound) {
            isFound.visits++;
        } else {
            acc.push({
                originalDate: session.createdAt,
                date,
                visits: 1
            });
        }
        return acc.sort((a, b) => new Date(a.originalDate).getTime() - new Date(b.originalDate).getTime());
    }, [] as { date: string, visits: number, originalDate: Date }[]);
    return visitors
};

export const getOnlineVisitors = (sessions: Session[]) => {
    const now = new Date();
    const onlineVisitors = sessions.filter(session => {
        const diff = now.getTime() - new Date(session.updatedAt).getTime();
        return diff < 1000 * 30
    })
    return onlineVisitors.length
}

export const getEvents = (events: Events[], sessions: Session[], pages: PageView[]) => {
    const eventWithSession = events.map(event => {
        const session = sessions.find(session => session.id === event.sessionId)
        const page = pages.find(page => page.id === event.pageId)
        return {
            ...event,
            ...session,
            page
        }
    })
    return eventWithSession.filter(event => event.eventName)
}

export type EventsWithData = ReturnType<typeof getEvents>


export const getUtmSources = (sessions: Session[]) => {
    sessions = sessions.filter(session => {
        if (session.queryParams) {
            return session.queryParams.utm_source
        }
    })
    const utmSources = sessions.reduce((acc, session) => {
        const utmSource = session.queryParams?.utm_source ?? "unknown"
        const isFound = acc.find(p => p.utmSource === utmSource);
        if (isFound) {
            isFound.visits++;
        } else {
            acc.push({
                utmSource,
                visits: 1
            });
        }
        return acc;
    }, [] as { utmSource: string, visits: number }[]);
    return utmSources
}

export const getUtmCampaigns = (sessions: Session[]) => {
    sessions = sessions.filter(session => {
        if (session.queryParams) {
            console.log(session.queryParams)
            return session.queryParams.utm_campaign
        }
    }
    )
    const utmCampaigns = sessions.reduce((acc, session) => {
        const utmCampaign = session.queryParams?.utm_campaign ?? "unknown"
        const isFound = acc.find(p => p.utmCampaign === utmCampaign);
        if (isFound) {
            isFound.visits++;
        } else {
            acc.push({
                utmCampaign,
                visits: 1
            });
        }
        return acc;
    }
        , [] as { utmCampaign: string, visits: number }[]);
    return utmCampaigns
}