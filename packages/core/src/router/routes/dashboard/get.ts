import z from "zod";
import { RootDashboardSchema } from "../../schema";
import { ApiGetHandler } from "../../type";
import {
  getBrowser,
  getDevices,
  getEvents,
  getLoc,
  getOS,
  getOnlineVisitors,
  getPageViews,
  getPages,
  getReferer,
  getUniqueVisitors,
  getVisitorsByDate,
} from "./utils";
import {
  EventsWithData,
  getAverageTime,
  getBounceRate,
  getNewVisitors,
  getUtmCampaigns,
  getUtmSources,
} from "./utils/analysis";
import { GenericError, PageView, Session } from "../../..";
import { filter } from "./filter/smallFilter";
import { Filter } from "./filter/type";
import { getDashboardDataExperimental } from "./get-exp";

export type GetInsightQuery = z.infer<typeof getInsightSchema>;

export type GetInsightResponse = {
  insight: {
    uniqueVisitors: {
      total: number;
      change: number;
    };
    pageView: {
      total: number;
      change: number;
    };
    averageTime: {
      total: string;
      change: number;
    };
    bounceRate: {
      total: number;
      change: number;
    };
    newVisitors: {
      total: number;
      change: number;
    };
  };
  data: {
    pages: {
      page: string;
      visits: number;
    }[];
    devices: {
      device: string;
      visits: number;
    }[];
    referrer: {
      referrer: string;
      visits: number;
      referrerDomain: string;
    }[];
    locations: {
      city: {
        location: string;
        visits: number;
        country: string;
      }[];
      country: {
        location: string;
        visits: number;
      }[];
    };
    os: {
      os: string;
      visits: number;
    }[];
    browser: {
      browser: string;
      visits: number;
    }[];
    utmSources: {
      utmSource: string;
      visits: number;
    }[];
    utmCampaigns: {
      utmCampaign: string;
      visits: number;
    }[];
  };
  graph: {
    uniqueVisitorsByDate: {
      date: string;
      visits: number;
    }[];
    uniqueSessionByDate: {
      date: string;
      visits: number;
    }[];
  };
  onlineUsers: number;
  eventsWithData: EventsWithData;
};

const getInsightSchema = RootDashboardSchema.merge(
  z.object({
    startDate: z.string(),
    endDate: z.string(),
    timeZone: z.string(),
    filter: z.string(),
    websiteId: z.string().optional(),
  })
);

export const getDashboardData: ApiGetHandler<
  GetInsightQuery,
  GetInsightResponse
> = async (req, options) => {
  const adapter = options.adapter;
  const query = getInsightSchema.safeParse(req.query);

  if (query.success) {
    try {
      const { startDate, endDate, timeZone, websiteId } = query.data;
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const duration = endDateObj.getTime() - startDateObj.getTime();
      const pastEndDateObj = new Date(startDateObj.getTime() - duration);
      if (adapter.getData) {
        return await getDashboardDataExperimental(req, options);
      }
      let startTime = performance.now();
      let users = await adapter.getVisitor(startDateObj, endDateObj, websiteId);
      let pastUsers = await adapter.getVisitor(
        pastEndDateObj,
        startDateObj,
        websiteId
      );
      let pageViews = await adapter.getPageViews(
        startDateObj,
        endDateObj,
        websiteId
      );
      let pastPageViews = await adapter.getPageViews(
        pastEndDateObj,
        startDateObj,
        websiteId
      );
      let sessions = await adapter.getSession(
        startDateObj,
        endDateObj,
        websiteId
      );
      let pastSessions = await adapter.getSession(
        pastEndDateObj,
        startDateObj,
        websiteId
      );
      let events = await adapter.getEvents(startDateObj, endDateObj, websiteId);
      let endTime = performance.now();
      console.log(endTime - startTime, "query");
      //add utmCampaigns as a key in session
      sessions = sessions.map((s) => {
        const utmCampaign = s.queryParams?.utm_campaign ?? "";
        const utmSource = s.queryParams?.utm_source ?? "";
        return { ...s, utmCampaign, utmSource };
      });
      startTime = performance.now();
      //filters
      const filters = JSON.parse(query.data.filter) as
        | Filter<Session, "session">[]
        | Filter<PageView, "pageview">[];
      filters.forEach((f) => {
        if (f.data === "session") {
          sessions = filter(sessions)
            .where(f.key, f.operator, f.value)
            .execute();
          pastSessions = filter(pastSessions)
            .where(f.key, f.operator, f.value)
            .execute();
          pageViews = pageViews.filter((p) => {
            const session = sessions.filter((s) => s.id === p.sessionId);
            return session.length > 0;
          });
          pastPageViews = pastPageViews.filter((p) => {
            const session = pastSessions.filter((s) => s.id === p.sessionId);
            return session.length > 0;
          });
          users = users.filter((u) => {
            const session = sessions.filter((s) => s.visitorId === u.id);
            return session.length > 0;
          });
          pastUsers = pastUsers.filter((u) => {
            const session = pastSessions.filter((s) => s.visitorId === u.id);
            return session.length > 0;
          });
          events = events.filter((e) => {
            const session = sessions.filter((s) => s.id === e.sessionId);
            return session.length > 0;
          });
        } else if (f.data === "pageview") {
          pageViews = filter(pageViews)
            .where(f.key, f.operator, f.value)
            .execute();
          pastPageViews = filter(pastPageViews)
            .where(f.key, f.operator, f.value)
            .execute();
          sessions = sessions.filter((s) => {
            const pageView = pageViews.filter((p) => p.sessionId === s.id);
            return pageView.length > 0;
          });
          pastSessions = pastSessions.filter((s) => {
            const pageView = pastPageViews.filter((p) => p.sessionId === s.id);
            return pageView.length > 0;
          });
          users = users.filter((u) => {
            const session = sessions.filter((s) => s.visitorId === u.id);
            return session.length > 0;
          });
          pastUsers = pastUsers.filter((u) => {
            const session = pastSessions.filter((s) => s.visitorId === u.id);
            return session.length > 0;
          });
          events = events.filter((e) => {
            const session = sessions.filter((s) => s.id === e.sessionId);
            return session.length > 0;
          });
        }
      });

      //insights data
      const uniqueVisitors = getUniqueVisitors(sessions, pastSessions);
      const newVisitors = getNewVisitors(users, pastUsers);
      const pageView = getPageViews(pageViews, pastPageViews);
      const averageTime = getAverageTime(
        sessions,
        pastSessions,
        pageViews,
        pastPageViews
      );
      const bounceRate = getBounceRate(
        pageViews,
        pastPageViews,
        sessions,
        pastSessions
      );
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
        true
      );
      const uniqueSessionByDate = getVisitorsByDate(
        sessions,
        startDateObj,
        endDateObj,
        timeZone,
        false
      );
      const onlineUsers = getOnlineVisitors(sessions);
      const eventsWithData = getEvents(events, sessions, pageViews);
      const utmSources = getUtmSources(sessions);
      const utmCampaigns = getUtmCampaigns(sessions);
      endTime = performance.now();
      console.log(endTime - startTime, "Js");

      return {
        message: "success",
        code: 200,
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
      };
    } catch (e) {
      console.error(e);
      throw new GenericError("Error getting insight data", {
        path: "/insights",
      });
    }
  } else {
    throw new Error("Invalid request query param");
  }
};
