import { PageView, User, Session, Events } from "../../../../adapters/models"
import { getTimeRange } from "./timeHelper"

export const getUniqueVisitors = (user: User[], pastUsers: User[]) => {
    return {
        total: user.length,
        change: pastUsers.length ? Math.floor(((user.length - pastUsers.length) / pastUsers.length) * 100) : 100
    }
}

export const getPageViews = (pageViews: PageView[], pastPageViews: PageView[]) => {
    return {
        total: pageViews.length,
        change: pastPageViews.length ? Math.floor(((pageViews.length - pastPageViews.length) / pastPageViews.length) * 100) : 100
    }
}

export const getAverageTime = (sessions: Session[], pastSessions: Session[], bySecond: boolean) => {
    const total = sessions.reduce((acc, session) => acc + session.duration, 0);
    const pastTotal = pastSessions.reduce((acc, session) => acc + session.duration, 0);
    const change = pastTotal ? Math.floor(((total - pastTotal) / pastTotal) * 100) : 100
    if (!bySecond) {
        return {
            total: Math.ceil(total / sessions.length / 60),
            change
        }
    } else {
        return {
            total: Math.floor(total / sessions.length),
            change
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
    const bounce = sessions.filter(session => pageViews.filter(pageView => pageView.sessionId === session.id).length >= 1);
    const pastBounce = pastSessions.filter(session => pastPageViews.filter(pageView => pageView.sessionId === session.id).length >= 1);
    return {
        total: Math.floor(bounce.length / totalSessions * 100),
        change: pastBounce.length ? Math.floor((bounce.length - pastBounce.length) / pastBounce.length * 100) : 100
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
    const referees = sessions.reduce((acc, session) => {
        const referrer = session.referrer === "" ? "Direct" : session.referrer;
        const isFound = acc.find(p => p.referrer === referrer);
        if (isFound) {
            isFound.visits++;
        } else {
            acc.push({
                referrer,
                visits: 1
            });
        }
        return acc;
    }, [] as { referrer: string, visits: number }[]);
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

export const getVisitorsByDate = (sessions: Session[], startDate: Date, endDate: Date, uniqueUsers = true) => {
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const range = getTimeRange(startDate, endDate)
    const uniqueUserSessions = sessions.filter((session, index, self) =>
        index === self.findIndex((s) => (
            s.userId === session.userId
        ))
    )
    sessions = uniqueUsers ? uniqueUserSessions : sessions
    if (range / ONE_DAY <= 2) {
        const visitors = sessions.reduce((acc, session) => {
            //divide it by hour
            const date = new Date(session.createdAt).toLocaleTimeString("default", { hour: "numeric" });
            const isFound = acc.find(p => p.date === date);
            if (isFound) {
                isFound.visits++;
            } else {
                acc.push({
                    date,
                    visits: 1
                });
            }
            return acc;
        }, [] as { date: string, visits: number }[]);
        return visitors
    } else if (range / ONE_DAY <= 364) {
        const visitors = sessions.reduce((acc, session) => {
            const date = new Date(session.createdAt).toLocaleDateString("default", { day: "numeric", month: "short" });
            const isFound = acc.find(p => p.date === date);
            if (isFound) {
                isFound.visits++;
            } else {
                acc.push({
                    date,
                    visits: 1
                });
            }
            return acc;
        }, [] as { date: string, visits: number }[]);
        return visitors
    } else {
        const visitors = sessions.reduce((acc, session) => {
            const date = new Date(session.createdAt).toLocaleDateString("default", { month: "short" });
            const isFound = acc.find(p => p.date === date);
            if (isFound) {
                isFound.visits++;
            } else {
                acc.push({
                    date,
                    visits: 1
                });
            }
            return acc;
        }, [] as { date: string, visits: number }[]);
        return visitors
    }
}

export const getOnlineUsers = (sessions: Session[]) => {
    const now = new Date();
    const onlineUsers = sessions.filter(session => {
        const diff = now.getTime() - new Date(session.updatedAt).getTime();
        return diff < 1000 * 30
    })
    return onlineUsers.length
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