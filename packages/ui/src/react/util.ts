/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PageView, Session, User } from "@loglib/core"

//get unique visitors
const getUniqueVisitors = (user: User[], pastUsers: User[]) => {
    return {
        total: user.length,
        change: (user.length - user.length) / pastUsers.length
    }
}

const getPageViews = (pageViews: PageView[], pastPageViews: PageView[]) => {
    return {
        total: pageViews.length,
        change: (pageViews.length - pastPageViews.length) / pastPageViews.length
    }
}

const getBounceRate = (pageViews: PageView[], pastPageViews: PageView[], sessions: Session[], pastSessions: Session[]) => {
    const bounce = pageViews.filter(pageView => sessions.filter(session => session.id === pageView.sessionId).length === 1);
    const pastBounce = pastPageViews.filter(pageView => pastSessions.filter(session => session.id === pageView.sessionId).length === 1);
    return {
        total: bounce.length / sessions.length,
        change: (bounce.length - pastBounce.length) / pastBounce.length
    }
}

const getAverageTime = (sessions: Session[], pastSessions: Session[]) => {
    const total = sessions.reduce((acc, session) => acc + session.duration, 0);
    const pastTotal = pastSessions.reduce((acc, session) => acc + session.duration, 0);
    return {
        total: total / sessions.length,
        change: (total - pastTotal) / pastTotal
    }
}

const getPages = (pageViews: PageView[]) => {
    const pages = pageViews.map(page => ({
        link: page.page,
        count: pageViews.filter(p => p.page === page.page).length
    }))
    return new Set(pages);
}

const getLocByCity = (sessions: Session[]) => {
    const locations = sessions.map(session => ({
        location: session.city,
        count: sessions.filter(s => s.city === session.city).length
    }));
    return new Set(locations);
}

const getLocByCountry = (sessions: Session[]) => {
    const locations = sessions.map(session => ({
        location: session.country,
        count: sessions.filter(s => s.country === session.country).length
    }));
    return new Set(locations);
}

const getDevice = (sessions: Session[]) => {
    const devices = sessions.map(session => ({
        device: session.device,
        count: sessions.filter(s => s.device === session.device).length
    }));
    return new Set(devices);
}

const getReferer = (sessions: Session[]) => {
    const referees = sessions.map(session => ({
        referer: session.referrer,
        count: sessions.filter(s => s.referrer === session.referrer).length
    }));
    return new Set(referees);
}

const getVisitorsByDate = (sessions: Session[]) => {
    const visitors = sessions.map(session => ({
        date: session.createdAt,
        count: sessions.filter(s => s.createdAt === session.createdAt).length
    }));
    return new Set(visitors);
}

export { getAverageTime, getBounceRate, getDevice, getLocByCity, getLocByCountry, getPageViews, getPages, getVisitorsByDate, getUniqueVisitors, getReferer }