import z from "zod";
import { RootDashboardSchema } from "../../schema";
import { ApiGetHandler } from "../../type";
import { getAverageTime, getBrowser, getDevices, getEvents, getLoc, getOS, getOnlineUsers, getPageViews, getPages, getReferer, getUniqueVisitors, getVisitorsByDate } from "./utils";
import { EventsWithData, getBounceRate } from "./utils/analysis";
import { GenericError } from "../../..";

export type GetInsightQuery = {
    startDate: string,
    endDate: string
}

export type GetInsightResponse = {
    insight: {
        uniqueVisitors: {
            total: number,
            change: number
        },
        pageView: {
            total: number,
            change: number
        },
        averageTime: {
            bySec: {
                total: number,
                change: number
            },
            byMin: {
                total: number,
                change: number
            }
        },
        bounceRate: {
            total: number,
            change: number
        },

    },
    data: {
        pages: {
            page: string,
            visits: number
        }[],
        devices: {
            device: string,
            visits: number
        }[],
        referrer: {
            referrer: string;
            visits: number;
        }[],
        locations: {
            city: {
                location: string;
                visits: number;
            }[],
            country: {
                location: string;
                visits: number;
            }[]
        },
        os: {
            os: string;
            visits: number;
        }[],
        browser: {
            browser: string;
            visits: number;
        }[]
    },
    graph: {
        uniqueVisitorsByDate: {
            date: string;
            visits: number;
        }[],
        uniqueSessionByDate: {
            date: string;
            visits: number;
        }[]
    },
    onlineUsers: number,
    eventsWithData: EventsWithData
}

const getInsightSchema = RootDashboardSchema.merge(z.object({
    startDate: z.string(),
    endDate: z.string()
}))


export const getDashboardData: ApiGetHandler<GetInsightQuery, GetInsightResponse> = async (req, options) => {
    const adapter = options.adapter
    const query = getInsightSchema.safeParse(req.query)
    if (query.success) {
        try {
            const { startDate, endDate } = query.data
            const startDateObj = new Date(startDate)
            const endDateObj = new Date(endDate)
            const duration = endDateObj.getTime() - startDateObj.getTime()
            const pastEndDateObj = new Date(startDateObj.getTime() - duration)
            const users = await adapter.getUser(startDateObj, endDateObj)
            const pastUsers = await adapter.getUser(pastEndDateObj, startDateObj)
            const pageViews = await adapter.getPageViews(startDateObj, endDateObj)
            const pastPageViews = await adapter.getPageViews(pastEndDateObj, startDateObj)
            const sessions = await adapter.getSession(startDateObj, endDateObj)
            const pastSessions = await adapter.getSession(pastEndDateObj, startDateObj)
            const events = await adapter.getEvents(startDateObj, endDateObj)

            //insights data
            const uniqueVisitors = getUniqueVisitors(users, pastUsers)
            const pageView = getPageViews(pageViews, pastPageViews)
            const averageTimeBySec = getAverageTime(sessions, pastSessions, true)
            const averageTimeByMin = getAverageTime(sessions, pastSessions, false)
            const bounceRate = getBounceRate(pageViews, pastPageViews, sessions, pastSessions)
            const pages = getPages(pageViews)
            const devices = getDevices(sessions)
            const referrer = getReferer(sessions)
            const locations = {
                city: getLoc(sessions, false),
                country: getLoc(sessions)
            }
            const os = getOS(sessions)
            const browser = getBrowser(sessions)
            const uniqueVisitorsByDate = getVisitorsByDate(sessions, startDateObj, endDateObj)
            const uniqueSessionByDate = getVisitorsByDate(sessions, startDateObj, endDateObj, true)
            const onlineUsers = getOnlineUsers(sessions)
            const eventsWithData = getEvents(events, sessions, pageViews)
            return {
                message: 'success',
                code: 200,
                data: {

                    insight: {
                        uniqueVisitors,
                        pageView,
                        averageTime: {
                            byMin: averageTimeByMin,
                            bySec: averageTimeBySec
                        },
                        bounceRate,
                    },
                    data: {
                        pages,
                        devices,
                        referrer,
                        locations,
                        os,
                        browser
                    },
                    graph: {
                        uniqueVisitorsByDate,
                        uniqueSessionByDate,
                    },
                    onlineUsers,
                    eventsWithData
                }
            }
        } catch (e) {
            console.error(e)
            throw new GenericError('Error getting insight data', { path: "/insights" })
        }
    }
    else {
        throw new Error('Invalid request query param')
    }
}