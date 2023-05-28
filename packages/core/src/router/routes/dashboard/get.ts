import z from "zod";
import { RootDashboardSchema } from "../../schema";
import { ApiGetHandler } from "../../type";
import { GenericError, PageView, Session, User, Events } from "../../..";

export type GetInsightQuery = {
    startDate: string,
    endDate: string
}

export type GetInsightResponse = {
    users: User[],
    pageViews: PageView[],
    sessions: Session[],
    pastUsers: User[],
    pastPageViews: PageView[],
    pastSessions: Session[],
    events: Events[],
    pastEvents: Events[],
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
            const pastEvents = await adapter.getEvents(pastEndDateObj, startDateObj)
            return {
                message: 'success',
                code: 200,
                data: {
                    users,
                    pageViews,
                    sessions,
                    pastUsers,
                    pastPageViews,
                    pastSessions,
                    events,
                    pastEvents
                }
            }
        } catch (e) {
            throw new GenericError('Error getting insight data', { path: "/insights" })
        }
    }
    else {
        throw new Error('Invalid request query param')
    }
}