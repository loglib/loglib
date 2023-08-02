import {
    getAverageTime,
    getBounceRate,
    getBrowser,
    getDevices,
    getEvents,
    getLoc,
    getNewVisitors,
    getOS,
    getOnlineVisitors,
    getPageViews,
    getPages,
    getReferer,
    getUniqueVisitors,
    getUtmCampaigns,
    getUtmSources,
    getVisitorsByDate,
} from "../lib/analysis";
import { apiResponse } from "../lib/api-response";
import { filter } from "../lib/small-filter";
import {
    getEventsEndpoint,
    getNewVisitorsEndpoint,
    getPageViewsEndpoint,
    getSessionsEndpoint,
} from "../lib/tinybird";
import { Filter } from "../type";
import { PageView, Session } from "../type";
import { RouteType } from "./type";
import { z } from "zod";

const insightSchema = z.object({
    startDate: z.string(),
    endDate: z.string(),
    timeZone: z.string(),
    filter: z.string(),
    websiteId: z.string(),
});

export const getInsightData: RouteType = async ({ tb, query: rawQuery }) => {
    const query = insightSchema.safeParse(rawQuery);
    if (!query.success) {
        return apiResponse.badRequest;
    }
    const { startDate, endDate, timeZone, websiteId } = query.data;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const duration = endDateObj.getTime() - startDateObj.getTime();
    const pastEndDateObj = new Date(startDateObj.getTime() - duration);

    let [sessions, pastSessions, pageViews, pastPageViews, events, visitors, pastVisitors] =
        await Promise.all([
            getSessionsEndpoint(tb)({
                websiteId,
                startDate: startDateObj.toISOString(),
                endDate: endDateObj.toISOString(),
            }).then((res) => res.data),
            getSessionsEndpoint(tb)({
                websiteId,
                startDate: pastEndDateObj.toISOString(),
                endDate: startDateObj.toISOString(),
            }).then((res) => res.data),
            getPageViewsEndpoint(tb)({
                websiteId,
                startDate: startDateObj.toISOString(),
                endDate: endDateObj.toISOString(),
            }).then((res) => res.data),
            getPageViewsEndpoint(tb)({
                websiteId,
                startDate: pastEndDateObj.toISOString(),
                endDate: startDateObj.toISOString(),
            }).then((res) => res.data),
            getEventsEndpoint(tb)({
                websiteId,
                startDate: startDateObj.toISOString(),
                endDate: endDateObj.toISOString(),
            }).then((res) => res.data),
            getNewVisitorsEndpoint(tb)({
                websiteId,
                startDate: startDateObj.toISOString(),
                endDate: endDateObj.toISOString(),
            }).then((res) => res.data),
            getNewVisitorsEndpoint(tb)({
                websiteId,
                startDate: pastEndDateObj.toISOString(),
                endDate: startDateObj.toISOString(),
            }).then((res) => res.data),
        ]);

    //add utmCampaigns as a key in session
    sessions = sessions.map((s) => {
        const queryParams = JSON.parse(s.queryParams);
        const utmCampaign = queryParams?.utm_campaign ?? "";
        const utmSource = queryParams?.utm_source ?? "";
        return { ...s, utmCampaign, utmSource };
    });

    //filters
    const filters = JSON.parse(query.data.filter) as
        | Filter<Session, "session">[]
        | Filter<PageView, "pageview">[];
    filters.forEach((f) => {
        if (f.data === "session") {
            sessions = filter(sessions).where(f.key, f.operator, f.value).execute();
            pastSessions = filter(pastSessions).where(f.key, f.operator, f.value).execute();
            pageViews = pageViews.filter((p) => {
                const session = sessions.filter((s) => s.id === p.sessionId);
                return session.length > 0;
            });
            pastPageViews = pastPageViews.filter((p) => {
                const session = pastSessions.filter((s) => s.id === p.sessionId);
                return session.length > 0;
            });
            events = events.filter((e) => {
                const session = sessions.filter((s) => s.id === e.sessionId);
                return session.length > 0;
            });
        } else if (f.data === "pageview") {
            pageViews = filter(pageViews).where(f.key, f.operator, f.value).execute();
            pastPageViews = filter(pastPageViews).where(f.key, f.operator, f.value).execute();
            sessions = sessions.filter((s) => {
                const pageView = pageViews.filter((p) => p.sessionId === s.id);
                return pageView.length > 0;
            });
            pastSessions = pastSessions.filter((s) => {
                const pageView = pastPageViews.filter((p) => p.sessionId === s.id);
                return pageView.length > 0;
            });
            events = events.filter((e) => {
                const session = sessions.filter((s) => s.id === e.sessionId);
                return session.length > 0;
            });
        }
    });

    //insights data
    const uniqueVisitors = getUniqueVisitors(sessions, pastSessions);
    const pageView = getPageViews(pageViews, pastPageViews);
    const averageTime = getAverageTime(sessions, pastSessions, pageViews, pastPageViews);
    const bounceRate = getBounceRate(pageViews, pastPageViews, sessions, pastSessions);
    const pages = getPages(pageViews);
    const devices = getDevices(sessions);
    const referrer = getReferer(sessions);
    const locations = {
        city: getLoc(sessions, false),
        country: getLoc(sessions),
    };
    const os = getOS(sessions);
    const browser = getBrowser(sessions);
    const uniqueVisitorsByDate = getVisitorsByDate(
        sessions,
        startDateObj,
        endDateObj,
        timeZone,
        true,
    );
    const uniqueSessionByDate = getVisitorsByDate(
        sessions,
        startDateObj,
        endDateObj,
        timeZone,
        false,
    );
    const newVisitors = getNewVisitors(visitors, pastVisitors);
    const onlineUsers = getOnlineVisitors(sessions);
    const eventsWithData = getEvents(events, sessions, pageViews);
    const utmSources = getUtmSources(sessions);
    const utmCampaigns = getUtmCampaigns(sessions);

    return {
        data: {
            insight: {
                uniqueVisitors,
                pageView,
                averageTime,
                bounceRate,
                newVisitors,
            },
            data: {
                pages,
                devices,
                referrer,
                locations,
                os,
                browser,
                utmCampaigns,
                utmSources,
            },
            graph: {
                uniqueVisitorsByDate,
                uniqueSessionByDate,
            },
            onlineUsers,
            eventsWithData,
        },
        status: 200,
    };
};
